document.querySelectorAll('form[action^="/portfolio/delete"]').forEach(form => {
    form.addEventListener('submit', (e) => {
        const confirmed = confirm('Are you sure you want to delete this item?');
        if (!confirmed) {
            e.preventDefault();
        }
    });
});
