using System;
using System.Collections.Generic;

namespace Dal.Models;

public partial class Payment
{
    public int PaymentId { get; set; }

    public int MortgageId { get; set; }

    public DateOnly PaymentDate { get; set; }

    public double PaymentAmount { get; set; }

    public string PaymentStatus { get; set; } = null!;

    public virtual Mortgage Mortgage { get; set; } = null!;
}
