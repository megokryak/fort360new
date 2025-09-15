document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('downloadPrezButton').addEventListener('click', function() {
      const link = document.createElement('a');
      link.href = '/assets/images/fort360_prezentation_2025.pdf';
      link.download = 'fort360_prezentation_2025.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
});