(() => {
  const syncCommentHeights = () => {
    document.querySelectorAll('.prototype--with-comments .block-row').forEach((row) => {
      const section = row.querySelector('.prototype-block > section');
      const comment = row.querySelector('.block-comment');
      const inner = row.querySelector('.block-comment__inner');

      if (!section || !comment || !inner) return;

      inner.style.maxHeight = 'none';
      const sectionHeight = section.getBoundingClientRect().height;
      const styles = getComputedStyle(comment);
      const verticalPadding = parseFloat(styles.paddingTop) + parseFloat(styles.paddingBottom);
      inner.style.maxHeight = `${Math.max(0, sectionHeight - verticalPadding)}px`;
    });
  };

  let frameId = 0;
  const scheduleSync = () => {
    cancelAnimationFrame(frameId);
    frameId = requestAnimationFrame(syncCommentHeights);
  };

  window.addEventListener('load', scheduleSync);
  window.addEventListener('resize', scheduleSync);
  if (document.fonts?.ready) {
    document.fonts.ready.then(scheduleSync);
  }
})();
