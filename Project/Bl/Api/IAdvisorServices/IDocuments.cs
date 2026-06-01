using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Api.IAdvisorServices
{
    internal interface IDocuments
    {
      bool  VerifyDocument(int documentId, bool isVerified);
    }
}
