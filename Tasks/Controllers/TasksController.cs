using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http.Cors;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Tasks.DTOs;
using Tasks.Models;

namespace Tasks.Controllers
{
    [ApiController]
    [Route("api/tasks")]
    public class TasksController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public TasksController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;

        }
      
        // POST: api/Tasks
        [HttpPost]
        [HttpPost("create")]
        public ActionResult<TaskModel> CreateTask(TaskAddDTO taskAddDTO)
        {
            try
            {
                if (taskAddDTO == null)
                {
                    return BadRequest();
                }
                var task = _mapper.Map<TaskModel>(taskAddDTO);

                _context.Tasks.Add(task);
               _context.SaveChanges();

                return Ok(task);
            }

            catch(Exception ex)
            {
                return BadRequest();
            }

        }


        // GET: api/Tasks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TaskAllDTO>>> GetTasks()
        {
            var tasks = await _context.Tasks.ToListAsync();

            
            return _mapper.Map<List<TaskAllDTO>>(tasks);

        }

        // GET: api/Tasks/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TaskModel>> GetTask(int id)
        {
            var task = await _context.Tasks.FindAsync(id);

            if (task == null)
            {
                return NotFound();
            }

            return task;
        }

        // PUT: api/Tasks/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTask(int id, TaskEditDTO taskDTO)
        {
            if (id != taskDTO.ID)
            {
                return BadRequest();
            }

            var taskModel = _mapper.Map<TaskModel>(taskDTO);

            _context.Entry(taskModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TaskExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }



        // DELETE: api/Tasks/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TaskModel>> DeleteTask(int id)
        {
            var task = await _context.Tasks.FindAsync(id);
            if (task == null)
            {
                return NotFound();
            }

            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();

            return task;
        }

        private bool TaskExists(int id)
        {
            return _context.Tasks.Any(e => e.ID == id);
        }
    }
}
