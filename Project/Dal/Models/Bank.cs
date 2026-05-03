using System;
using System.Collections.Generic;

namespace Dal.Models;

public partial class Bank
{
    public int BankId { get; set; }

    public string BankName { get; set; } = null!;

    public int BankCode { get; set; }

    public string ContactPerson { get; set; } = null!;

    public string? PhoneNumber { get; set; }

    public string Email { get; set; } = null!;

    public bool IsActive { get; set; }

    public double MinLoanAmount { get; set; }

    public double MaxLoanAmount { get; set; }

    public virtual ICollection<Case> Cases { get; set; } = new List<Case>();

    public virtual ICollection<MortgageProgram> MortgagePrograms { get; set; } = new List<MortgageProgram>();
}
