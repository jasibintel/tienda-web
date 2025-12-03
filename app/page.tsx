import Hero from '@/components/home/Hero';
import SocialProof from '@/components/home/SocialProof';
import FeaturedBooks from '@/components/home/FeaturedBooks';
import FreeBooks from '@/components/home/FreeBooks';
import Categories from '@/components/home/Categories';
import Testimonials from '@/components/home/Testimonials';

export default function Home() {
  return (
    <>
      <Hero />
      <SocialProof />
      <FeaturedBooks />
      <FreeBooks />
      <Categories />
      <Testimonials />
    </>
  );
}
