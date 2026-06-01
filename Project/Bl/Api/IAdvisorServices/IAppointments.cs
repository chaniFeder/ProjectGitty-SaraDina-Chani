﻿using Bl.Models.Customers;
using Bl.Models.MortgagAdvisor;
using Dal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Api.IAdvisorServices
{
    internal interface IAppointments
    {
        public List<AppointmentDto> GetMyUpcomingAppointments(string customerId);

        public AppointmentResponseDto RequestAppointment(string customerId, AppointmentRequestDto request);
    }
}