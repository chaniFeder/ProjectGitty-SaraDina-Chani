using System;
using System.Collections.Generic;

namespace Dal.database;

public partial class Table
{
    public int Id { get; set; }

    public string? FirstName { get; set; }

    public string? LastName { get; set; }
}
