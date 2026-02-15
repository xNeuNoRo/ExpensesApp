using System.Text.Json;

namespace Expenses.DAL.Repositories.Base;

public abstract class JsonBaseRepo<T>
    where T : class // Restringimos T a ser una clase (referencia) para evitar problemas con tipos primitivos
{
    // Ruta del archivo JSON
    protected readonly string _filePath;

    // Cache para almacenar las categorias en memoria
    // y ahorrar lecturas al disco cuando se realizan multiples operaciones seguidas
    protected List<T>? _cache;

    // Opciones de serializacion JSON
    protected readonly JsonSerializerOptions _options;

    // Constructor que inicializa la ruta del archivo y las opciones de serializacion
    protected JsonBaseRepo(string filePath)
    {
        // Inicializa la ruta del archivo
        _filePath = filePath;
        // Configuramos las opciones para que el JSON sea indentado (mas legible)
        _options = new JsonSerializerOptions
        {
            WriteIndented = true, // Indenta el JSON para que sea mas legible
            PropertyNameCaseInsensitive = true, // Ignora mayusculas/minusculas en los nombres de las propiedades
            AllowTrailingCommas = true, // Permite comas al final de los objetos/arrays en el JSON
        };

        // Asegura que el archivo exista
        EnsureFile();
    }

    // Metodo para asegurar que el archivo exista y tenga un array vacío si esta vacio
    private void EnsureFile()
    {
        // Obtiene el directorio del archivo
        var directory = Path.GetDirectoryName(_filePath);

        // Si hay un directorio en la ruta y no existe, lo crea
        if (!string.IsNullOrEmpty(directory) && !Directory.Exists(directory))
        {
            Directory.CreateDirectory(directory);
        }

        // Si el archivo no existe o esta vacio, lo crea con un array vacío
        if (!File.Exists(_filePath) || new FileInfo(_filePath).Length == 0)
            File.WriteAllText(_filePath, "[]");
    }

    // Metodo para cargar todos los items del archivo
    public async Task<List<T>> LoadAsync()
    {
        // Si la cache no es nula, retorna la cache para evitar leer el archivo nuevamente
        if (_cache != null)
            return _cache;

        // Asegura que el archivo exista antes de intentar cargarlo
        EnsureFile();

        // Lee el contenido del archivo JSON
        string json = await File.ReadAllTextAsync(_filePath);

        // Si el contenido esta vacío, retorna una lista vacia
        if (string.IsNullOrWhiteSpace(json))
        {
            _cache = new List<T>();
            return _cache;
        }

        try
        {
            // Deserializamos el contenido completo a una lista de objetos T
            // Si la deserializacion falla por X o Y razon, retornamos una lista vacia
            _cache = JsonSerializer.Deserialize<List<T>>(json, _options) ?? new List<T>();
            return _cache;
        }
        catch (JsonException)
        {
            // Si el JSON se corrompio, no se puede deserializar, o algo raro idk, retornamos una lista vacia
            _cache = new List<T>();
            return _cache;
        }
    }

    // Metodo para guardar todos los items en el archivo (sobrescribe lo que haya)
    public async Task SaveAllAsync(List<T> items)
    {
        // Serializamos la lista completa a formato JSON
        string json = JsonSerializer.Serialize(items, _options);
        // Escribimos el JSON en el archivo (sobrescribiendo lo que haya)
        await File.WriteAllTextAsync(_filePath, json);
        // Actualizamos la cache con los items guardados
        _cache = items;
    }

    // Metodo para agregar un nuevo item al archivo
    public async Task AppendAsync(T item)
    {
        // Cargamos todos los items existentes
        var items = await LoadAsync();

        // Agregamos el nuevo item a la lista
        items.Add(item);

        // Guardamos nuevamente toda la lista en el archivo
        await SaveAllAsync(items);
    }

    // Metodo para encontrar un item que cumpla con el callback dado.
    // Ej: x => x.Id == 5 (busca el item con Id 5)
    public async Task<T?> FindAsync(Func<T, bool> cb)
    {
        // Buscamos el primer objeto que cumpla la condición del delegado
        return (await LoadAsync()).FirstOrDefault(cb);
    }

    // Metodo para actualizar un item que cumpla con el callback dado
    public async Task<bool> UpdateAsync(Func<T, bool> cb, T newItem)
    {
        // Cargamos todos los items
        var items = await LoadAsync();

        // Buscamos el indice del primer item que cumple con el callback
        int index = items.FindIndex(new Predicate<T>(cb));

        // Si no se encontro ningun item que cumpla con el callback, retorna false
        if (index == -1)
            return false;

        // Reemplaza el item en el indice encontrado con el nuevo item dado
        items[index] = newItem;

        // Guarda todos los items actualizados en el archivo
        await SaveAllAsync(items);

        // Retorna true indicando que se actualizo correctamente
        return true;
    }

    // Metodo para eliminar items que cumplan con el callback dado
    public async Task<bool> DeleteAsync(Func<T, bool> cb)
    {
        // Cargamos todos los items
        var items = await LoadAsync();

        // Cuenta cuantos items habia inicialmente
        int initialCount = items.Count;

        // Filtramos los items que NO cumplen con el callback
        // EJ: Si cb es x => x.Id == 5, se quedan todos los que NO tienen Id 5
        var remainingItems = items.Where(x => !cb(x)).ToList();

        // Si la cantidad de items restantes es diferente a la inicial, significa que se elimino al menos uno
        if (remainingItems.Count != initialCount)
        {
            // Guardamos la lista actualizada sin los items eliminados
            await SaveAllAsync(remainingItems);
            return true;
        }

        // Retornamos false indicando que no se elimino ningun item
        return false;
    }
}
