using System;
using System.Collections.Generic;

namespace Dal.Models;

public partial class Appointment
{
    public int AppointmentId { get; set; }

    public string CustomerId { get; set; } = null!;

    public string UserId { get; set; } = null!;

    public DateTime AppointmentDate { get; set; }

    public int Duration { get; set; }

    public string Status { get; set; } = null!;

    public string? Notes { get; set; }

    public string MeetingType { get; set; } = null!;

    public DateTime? CreatedDate { get; set; }

    public virtual Customer Customer { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
