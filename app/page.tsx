"use client";
import Link from "next/link";
import { useInView } from "react-intersection-observer";
import { motion } from "motion/react";
function Nav() {
  return (
    <nav className="flex justify-between items-center w-screen fixed py-2 px-4 z-50 bg-background h-fit md:gap-0 gap-2">
      <Link
        href={"#home"}
        className="md:text-[1.5rem] text-[1.2rem] font-bold "
        style={{ textDecoration: "none" }}
      >
        BlogApp
      </Link>
      <div className="h-fit flex md:gap-7 gap-4 text-(--secondary-text) items-center ">
        <div className="group relative">
          <Link
            href={"#home"}
            className="navLink"
            style={{ textDecoration: "none" }}
          >
            Home
          </Link>
          <span className="w-0 h-0.5 absolute left-0 bottom-0 bg-(--secondary-text) group-hover:w-full group-active:w-full transition-all duration-300"></span>
        </div>
        <div className="relative group">
          <Link
            href={"#about"}
            className="navLink"
            style={{ textDecoration: "none" }}
          >
            About
          </Link>
          <span className="w-0 h-0.5 absolute left-0 bottom-0 bg-(--secondary-text) group-hover:w-full group-active:w-full transition-all duration-300"></span>
        </div>
        <div className="relative group">
          <Link
            style={{ textDecoration: "none" }}
            href={"/news"}
            className="navLink"
          >
            News
          </Link>
          <span className="w-0 h-0.5 absolute left-0 bottom-0 bg-(--secondary-text) group-hover:w-full group-active:w-full transition-all duration-300"></span>
        </div>
        <div className="relative group">
          <Link
            href={"#contact"}
            className="navLink"
            style={{ textDecoration: "none" }}
          >
            Contact
          </Link>
          <span className="w-0 h-0.5 absolute left-0 bottom-0 bg-(--secondary-text) group-hover:w-full group-active:w-full transition-all duration-300"></span>
        </div>
      </div>
    </nav>
  );
}
function Home() {
  const [ref, inView] = useInView({
    triggerOnce: true,
  });
  return (
    <motion.div
      className="flex md:flex-row flex-col py-4 md:justify-center items-center pt-[15vh] px-10"
      initial={{ opacity: 0, y: 100 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      exit={{ opacity: 0, y: -100 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      ref={ref}
    >
      <div className="md:w-1/2 w-screen flex flex-col justify-center text-center md:text-left gap-4">
        <h1 className="text-(--secondary-text) font-thin text-[1.4rem]">
          Your Journey Begins Here
        </h1>
        <h1 className="text-foreground md:text-[3rem] text-[2rem] font-semibold">
          Explore The Advanced World Of Technology
        </h1>
        <p className="text-(--secondary-text)">
          This blog introduces a tech blog website that shares the latest news,
          reviews, and insights about technology.
        </p>
        <div className="flex gap-4 items-center">
          <Link
            href={"/signup"}
            className="w-fit text-[1.2rem] bg-(--brand-color) px-4 py-2 rounded-md font-bold"
          >
            Get Started Now
          </Link>
          <h1 className="text-[1.2rem] font-bold">OR</h1>
          <Link
            href={"/login"}
            className="w-fit h-fit px-5 py-2 bg-[#0c0c0c] rounded-md font-bold"
          >
            LogIn
          </Link>
        </div>
      </div>
      <div className="md:w-1/2 w-screen">
        <img
          src="/landing-page-hero.png"
          alt="Landing Page Image"
          className="rounded-lg grayscale-100 w-full"
        />
      </div>
    </motion.div>
  );
}
function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });
  return (
    <div
      className="flex h-1/5 md:flex-row flex-col md:gap-0 gap-4 md:mt-0 mt-[5vh]"
      id="about"
    >
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 100 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="w-screen md:w-1/3 pl-8 flex flex-col gap-8 pt-4 h-80"
      >
        <h1 className="text-[2rem] font-bold">Featured</h1>
        <div>
          <h1 className="text-[1.4rem] font-semibold">Latest Insights:</h1>
          <ul className="flex flex-col list-disc pl-8 gap-4 text-(--secondary-text) mt-4">
            <li>How AI is transforming daily life.</li>
            <li>Top 5 Machine learning Tools of 2025</li>
            <li>The ethics of Artificial Intelligence.</li>
          </ul>
        </div>
      </motion.div>
      <motion.div
        className="md:w-1/3 w-screen bg-(--secondary-background) pl-8 pt-4 h-80"
        ref={ref}
        initial={{ opacity: 0, y: 100 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4, ease: "easeInOut", delay: 0.2 }}
      >
        <h1 className="text-[2rem] font-bold">Our Mission</h1>
        <p className="leading-10 text-(--secondary-text)">
          We aim to make complex technology simple and exciting.Our mission is
          to help readers stay curious and informed about the rapidly evolving
          world of AI and technology.
        </p>
      </motion.div>
      <motion.div
        className="md:w-1/3 w-screen pl-8 pt-4 h-80"
        ref={ref}
        initial={{ opacity: 0, y: 100 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4, ease: "easeInOut", delay: 0.4 }}
      >
        <h1 className="text-[2rem] font-bold">Quotes</h1>
        <p className="leading-8 text-(--secondary-text)">
          “AI will be the best or worst thing ever for humanity, so we have to
          get it right.” -Elon Musk
        </p>
        <p className="leading-8 text-(--secondary-text)">
          “Our intelligence is what makes us human, and AI is an extension of
          that quality.” -Yann LeCun
        </p>
      </motion.div>
    </div>
  );
}
export default function Page() {
  return (
    <div>
      <Nav />
      <Home />
      <About />
    </div>
  );
}
