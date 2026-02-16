import Encouragement from './components/Encouragement';
import EquationEditor from './components/EquationEditor';
import Features from './components/Features';
import Footer from './components/Footer';
import HeroHeader from './components/HeroHeader';
import WhatIs from './components/WhatIs';

export default function Homepage() {
  return (
    <>
      <HeroHeader />
      <WhatIs />
      <Features />
      <EquationEditor />
      <Encouragement />
      <Footer />
    </>
  );
}
