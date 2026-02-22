using System;
using System.Collections.Generic;

namespace Dal.Models;

public partial class Customer
{
    public string CustomerId { get; set; } = null!;

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string PhoneNumber { get; set; } = null!;

    public string Address { get; set; } = null!;

    public DateOnly? DateOfBirth { get; set; }

    public double? MonthlyIncome { get; set; }

    public DateTime? CreatedDate { get; set; }

    public DateOnly? UpdateDate { get; set; }

    public virtual ICollection<Appointment> Appointments { get; set; } = new List<Appointment>();

    public virtual ICollection<Document> Documents { get; set; } = new List<Document>();

    public virtual ICollection<Mortgage> Mortgages { get; set; } = new List<Mortgage>();
}
