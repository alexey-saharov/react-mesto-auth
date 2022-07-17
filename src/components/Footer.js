import React from 'react';

function Footer() {
  const now = new Date();
  return (
    <footer className="footer root__section">
      <p className="footer__copyright">&#169; {now.getFullYear()} Алексей Сахаров</p>
    </footer>
  );
}

export default Footer;
