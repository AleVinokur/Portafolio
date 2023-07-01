document.addEventListener('DOMContentLoaded', function() {
  var menuLinks = document.querySelectorAll('.menu a');
  var details = document.querySelector('.navbar details');

  menuLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      var targetId = this.getAttribute('href');
      var targetElement = document.querySelector(targetId);

      // Cierra el elemento <details> que contiene el menú
      details.open = false;

      // Realiza un desplazamiento suave utilizando el método scrollIntoView
      targetElement.scrollIntoView({ behavior: 'smooth' });
    });
  });
});
