using System;
using System.Collections.Generic;

namespace Dal.Models;

public partial class Document
{
    public int DocumentId { get; set; }

    public string CustomerId { get; set; } = null!;

    public string? DocumentType { get; set; }

    public string DocumentName { get; set; } = null!;

    public string FilePath { get; set; } = null!;

    public bool? IsVerified { get; set; }

    public DateOnly? ExpiryDate { get; set; }

    public virtual Customer Customer { get; set; } = null!;
}
