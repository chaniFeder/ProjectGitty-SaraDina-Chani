using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Models.Customers
{
    internal class DocumentUploadDto
    {
        public string CustomerId { get; set; } 

        public string? DocumentType { get; set; }

        public string DocumentName { get; set; }
    }
}
