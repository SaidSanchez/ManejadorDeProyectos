document.querySelectorAll('.size').forEach(item => {
  item.addEventListener('change', evt => {
    console.log(window.location.pathname + evt.target.id);
    fetch(window.location.pathname + evt.target.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        size: Number(evt.target.value)
      })
    });
  });
});
