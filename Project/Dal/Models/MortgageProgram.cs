using System;
using System.Collections.Generic;

namespace Dal.Models;

public partial class MortgageProgram
{
    public int ProgramId { get; set; }

    public int BankId { get; set; }

    public string? ProgramName { get; set; }

    public double InterestRate { get; set; }

    public double MaxLoanPercentage { get; set; }

    public double MinDownPayment { get; set; }

    public bool IsActive { get; set; }

    public string? Description { get; set; }

    public virtual Bank Bank { get; set; } = null!;
}
