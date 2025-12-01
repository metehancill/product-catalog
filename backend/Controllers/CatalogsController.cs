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

        string pdfBase64;
        using (var memoryStream = new MemoryStream())
        {
            await dto.PdfFile.CopyToAsync(memoryStream);
            var pdfBytes = memoryStream.ToArray();
            pdfBase64 = Convert.ToBase64String(pdfBytes);
        }

        var catalog = new Catalog
        {
            Title = dto.Title,
            Description = dto.Description,
            PdfBase64 = pdfBase64,
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
            using (var memoryStream = new MemoryStream())
            {
                await dto.PdfFile.CopyToAsync(memoryStream);
                var pdfBytes = memoryStream.ToArray();
                catalog.PdfBase64 = Convert.ToBase64String(pdfBytes);
            }
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

}

public class CatalogUploadDto
{
    public required string Title { get; set; }
    public string? Description { get; set; }
    public required IFormFile PdfFile { get; set; }
}

public class CatalogUpdateDto
{
    public string? Title { get; set; }
    public string? Description { get; set; }
    public IFormFile? PdfFile { get; set; }
}
