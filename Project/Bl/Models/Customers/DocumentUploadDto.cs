using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Models.Customers
{
    public class DocumentUploadDto
    {
        public string CustomerId { get; set; }

        public string? DocumentType { get; set; }

        public string DocumentName { get; set; }

        public byte[] FileContent { get; set; }

        public string FileExtension { get; set; }
    }
}
