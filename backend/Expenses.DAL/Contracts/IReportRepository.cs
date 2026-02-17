namespace Expenses.DAL.Contracts;

public interface IReportRepository
{
    Task SaveReportAsync<T>(string fileName, T data);
}
