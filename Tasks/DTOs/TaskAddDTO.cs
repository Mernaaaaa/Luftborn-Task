using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tasks.Models;

namespace Tasks.DTOs
{
    public class TaskAddDTO
    {
        public string Title { get; set; }
        public string Description { get; set; }
    }
}
