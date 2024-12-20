import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <section>
      <h2>Home</h2>
      <p>Welcome to the recruiting pipeline!</p>
      <p className="spacer-lg">If this is your first time here, check out our <Link to="/analytics">Analytics</Link> page for insights on how well your recruiting is going.</p>
    </section>
      
  );
}

export default Home;
