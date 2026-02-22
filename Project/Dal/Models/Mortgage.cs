using System;
using System.Collections.Generic;

namespace Dal.Models;

public partial class Mortgage
{
    public int MortgageId { get; set; }

    public string CustomerId { get; set; } = null!;

    public double LoanAmount { get; set; }

    public double InterestRate { get; set; }

    public double LoanTerm { get; set; }

    public double MonthlyPayment { get; set; }

    public string LoanStatus { get; set; } = null!;

    public double PropertyValue { get; set; }

    public double DownPayment { get; set; }

    public DateOnly? ApplicationDate { get; set; }

    public DateOnly? ApprovalDate { get; set; }

    public int? BankId { get; set; }

    public string? LoanType { get; set; }

    public virtual Customer Customer { get; set; } = null!;

    public virtual ICollection<Payment> Payments { get; set; } = new List<Payment>();
}
