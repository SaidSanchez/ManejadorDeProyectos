var size = document.getElementById('size');

size.addEventListener('change', evt => {
  fetch(window.location.pathname, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      size: Number(evt.target.value)
    })
  });
});
