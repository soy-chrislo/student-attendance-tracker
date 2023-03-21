window.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('input');
  const button = document.getElementById('button');

  button.addEventListener('click', () => {
    const value = input.value;
    window.electronAPI.send('message', value);
  });
});