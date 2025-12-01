namespace CatalogApi.Models;

public class Catalog
{
    public int Id { get; set; }
    public required string Title { get; set; }
    public string? Description { get; set; }
    public required string PdfBase64 { get; set; }
    public bool IsActive { get; set; } = true;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; set; }
}
