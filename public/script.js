const API_URL = '/api/items'; // Adjust this URL based on your backend routes

// Fetch and display items
async function fetchItems() {
  const response = await fetch(API_URL);
  const items = await response.json();
  const itemsList = document.getElementById('items');
  itemsList.innerHTML = items.map(item => `
    <li class="flex justify-between items-center bg-gray-100 p-2 rounded shadow-sm">
      <span>${item.name}</span>
      <div>
        <button class="edit-btn px-3 py-1 bg-yellow-500 text-white rounded" data-id="${item.id}" data-name="${item.name}" data-description="${item.description}">Edit</button>
        <button class="delete-btn px-3 py-1 bg-red-500 text-white rounded" data-id="${item.id}">Delete</button>
      </div>
    </li>
  `).join('');
}

// Add new item
document.getElementById('add-item-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const description = document.getElementById('description').value;

  await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, description })
  });
  e.target.reset();
  fetchItems();
});

// Edit item
document.getElementById('edit-item-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = document.getElementById('edit-id').value;
  const name = document.getElementById('edit-name').value;
  const description = document.getElementById('edit-description').value;

  await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, description })
  });
  document.getElementById('edit-modal').classList.add('hidden');
  fetchItems();
});

// Delete item
document.getElementById('items').addEventListener('click', async (e) => {
  if (e.target.classList.contains('delete-btn')) {
    const id = e.target.getAttribute('data-id');
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchItems();
  } else if (e.target.classList.contains('edit-btn')) {
    const id = e.target.getAttribute('data-id');
    const name = e.target.getAttribute('data-name');
    const description = e.target.getAttribute('data-description');

    document.getElementById('edit-id').value = id;
    document.getElementById('edit-name').value = name;
    document.getElementById('edit-description').value = description;

    document.getElementById('edit-modal').classList.remove('hidden');
  }
});

// Close edit modal
document.getElementById('close-modal').addEventListener('click', () => {
  document.getElementById('edit-modal').classList.add('hidden');
});

// Initial load
fetchItems();
