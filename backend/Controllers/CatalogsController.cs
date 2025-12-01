using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CatalogApi.Data;
using CatalogApi.Models;

namespace CatalogApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CatalogsController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly IWebHostEnvironment _environment;

    public CatalogsController(ApplicationDbContext context, IWebHostEnvironment environment)
    {
        _context = context;
        _environment = environment;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Catalog>>> GetCatalogs()
    {
        return await _context.Catalogs
            .Where(c => c.IsActive)
            .OrderByDescending(c => c.CreatedAt)
            .ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Catalog>> GetCatalog(int id)
    {
        var catalog = await _context.Catalogs
            .FirstOrDefaultAsync(c => c.Id == id && c.IsActive);

        if (catalog == null)
        {
            return NotFound();
        }

        return catalog;
    }

    [HttpPost]
    public async Task<ActionResult<Catalog>> CreateCatalog([FromForm] CatalogUploadDto dto)
    {
        if (dto.PdfFile == null || dto.PdfFile.Length == 0)
        {
            return BadRequest("PDF file is required");
        }

        var uploadsFolder = Path.Combine(_environment.WebRootPath, "uploads", "catalogs");
        Directory.CreateDirectory(uploadsFolder);

        var pdfFileName = $"{Guid.NewGuid()}_{dto.PdfFile.FileName}";
        var pdfPath = Path.Combine(uploadsFolder, pdfFileName);

        using (var stream = new FileStream(pdfPath, FileMode.Create))
        {
            await dto.PdfFile.CopyToAsync(stream);
        }

        var pdfUrl = $"/uploads/catalogs/{pdfFileName}";
        var thumbnailUrl = dto.ThumbnailFile != null ? await SaveThumbnail(dto.ThumbnailFile) : null;

        var catalog = new Catalog
        {
            Title = dto.Title,
            Description = dto.Description,
            PdfUrl = pdfUrl,
            ThumbnailUrl = thumbnailUrl,
            CreatedAt = DateTime.UtcNow
        };

        _context.Catalogs.Add(catalog);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetCatalog), new { id = catalog.Id }, catalog);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateCatalog(int id, [FromForm] CatalogUpdateDto dto)
    {
        var catalog = await _context.Catalogs.FindAsync(id);
        if (catalog == null)
        {
            return NotFound();
        }

        catalog.Title = dto.Title ?? catalog.Title;
        catalog.Description = dto.Description;
        catalog.UpdatedAt = DateTime.UtcNow;

        if (dto.PdfFile != null && dto.PdfFile.Length > 0)
        {
            DeleteFile(catalog.PdfUrl);

            var uploadsFolder = Path.Combine(_environment.WebRootPath, "uploads", "catalogs");
            Directory.CreateDirectory(uploadsFolder);

            var pdfFileName = $"{Guid.NewGuid()}_{dto.PdfFile.FileName}";
            var pdfPath = Path.Combine(uploadsFolder, pdfFileName);

            using (var stream = new FileStream(pdfPath, FileMode.Create))
            {
                await dto.PdfFile.CopyToAsync(stream);
            }

            catalog.PdfUrl = $"/uploads/catalogs/{pdfFileName}";
        }

        if (dto.ThumbnailFile != null && dto.ThumbnailFile.Length > 0)
        {
            if (!string.IsNullOrEmpty(catalog.ThumbnailUrl))
            {
                DeleteFile(catalog.ThumbnailUrl);
            }
            catalog.ThumbnailUrl = await SaveThumbnail(dto.ThumbnailFile);
        }

        await _context.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCatalog(int id)
    {
        var catalog = await _context.Catalogs.FindAsync(id);
        if (catalog == null)
        {
            return NotFound();
        }

        catalog.IsActive = false;
        catalog.UpdatedAt = DateTime.UtcNow;
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private async Task<string> SaveThumbnail(IFormFile file)
    {
        var uploadsFolder = Path.Combine(_environment.WebRootPath, "uploads", "thumbnails");
        Directory.CreateDirectory(uploadsFolder);

        var fileName = $"{Guid.NewGuid()}_{file.FileName}";
        var filePath = Path.Combine(uploadsFolder, fileName);

        using (var stream = new FileStream(filePath, FileMode.Create))
        {
            await file.CopyToAsync(stream);
        }

        return $"/uploads/thumbnails/{fileName}";
    }

    private void DeleteFile(string url)
    {
        if (string.IsNullOrEmpty(url)) return;

        var filePath = Path.Combine(_environment.WebRootPath, url.TrimStart('/'));
        if (System.IO.File.Exists(filePath))
        {
            System.IO.File.Delete(filePath);
        }
    }
}

public class CatalogUploadDto
{
    public required string Title { get; set; }
    public string? Description { get; set; }
    public required IFormFile PdfFile { get; set; }
    public IFormFile? ThumbnailFile { get; set; }
}

public class CatalogUpdateDto
{
    public string? Title { get; set; }
    public string? Description { get; set; }
    public IFormFile? PdfFile { get; set; }
    public IFormFile? ThumbnailFile { get; set; }
}
