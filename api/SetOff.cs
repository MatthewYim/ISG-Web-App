using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
var conn = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<ApiDbContext>(options =>
    options.UseSqlite(conn));
builder.Services.AddTransient<UserService>();

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();


// app.MapGet("/hello", () => "Hello World");
// app.MapGet("/bye", () => "Bye");

app.MapGet("/users", (UserService users) =>
{
    return Results.Ok(users.GetAll());
});

app.MapGet("/users/{id}", (UserService users, int id) =>
{
    var user = users.GetById(id);
    if (user == null)
        return Results.NotFound("User does not exist");

    return Results.Ok(user);
});

app.MapPost("/users", (UserService users, User newUser) =>
{
    users.AddUser(newUser);
    return Results.Created($"/users/{newUser.Id}", newUser);
});

app.MapDelete("/users/{id}", (UserService users, int id) =>
{
    var result = users.DeleteUser(id);
    if (result)
        return Results.NoContent();

    return Results.BadRequest("User not found");
});

app.MapPut("/users/{id}", (UserService users, User updateUser, int id) =>
{
    var currentUserExist = users.GetById(id);
    if (currentUserExist != null)
    {
        users.updateUser(updateUser);
        return Results.Ok(users);
    }

    return Results.BadRequest("User not found");
});

app.Run();

class ApiDbContext : DbContext
{
    public virtual DbSet<User> Users { get; set; }

    public ApiDbContext(DbContextOptions<ApiDbContext> options) : base(options)
    {

    }
}

class User
{
    public int Id { get; set; }
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
}

class UserService
{

    private readonly ApiDbContext _dbContext;

    public UserService(ApiDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public IEnumerable<User> GetAll() => _dbContext.Users.ToList();
    public User? GetById(int id) => _dbContext.Users.FirstOrDefault(x => x.Id == id);
    public void AddUser(User user)
    {
        _dbContext.Users.Add(user);
        _dbContext.SaveChanges();
    }
    public bool DeleteUser(int id)
    {
        var userForDeletion = _dbContext.Users.FirstOrDefault(x => x.Id == id);

        if (userForDeletion != null)
        {
            _dbContext.Users.Remove(userForDeletion);
            _dbContext.SaveChanges();
            return true;
        }
        return false;
    }
    public void updateUser(User userForUpdate)
    {
        var currentUser = _dbContext.Users.FirstOrDefault(x => x.Id == userForUpdate.Id);

        if (currentUser != null)
        {
            currentUser.FirstName = userForUpdate.FirstName;
            currentUser.LastName = userForUpdate.LastName;
            _dbContext.SaveChanges();
        }
    }
}