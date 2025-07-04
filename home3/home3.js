document.querySelector('.read-button').addEventListener('click', () => {
  alert('Redirecting to Chapter #001 - The Outlaw\'s Son');
});


document.addEventListener('DOMContentLoaded', () => {
  const chapterItems = document.querySelectorAll('.chapter_list_ul_li');

  chapterItems.forEach(item => {
    item.addEventListener('click', () => {
      const link = item.querySelector('a');
      if (link) {
        link.click();
      }
    });
  });
});