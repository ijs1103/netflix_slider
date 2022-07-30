import type { NextPage } from 'next'
import { motion, AnimatePresence, useScroll } from 'framer-motion'
import { useState } from 'react' 
import { useRouter } from 'next/router'

const OFFSET = 6

const Home = () => {
  const router = useRouter()
  const { scrollY } = useScroll();
  const [isModalOn, setIsModalOn] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const numArr = Array.from({length: 20}, (_, i: number) => i+1)
  const lastIndex = Math.ceil(numArr.length / OFFSET)-1
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const onBoxClicked = (cur: number) => {
    setIsModalOn(true)
  }
  const onPrevClick = () => {
    if(leaving) return;
    toggleLeaving();
    setDirection(-1)
    if (index > 0) {
      setIndex(prev => prev - 1)
    } else {
      setIndex(lastIndex)
    }
  }
  const onNextClick = () => {
    if(leaving) return;
    toggleLeaving();
    setDirection(1)
    if (index < lastIndex) {
      setIndex(prev => prev + 1)
    } else {
      setIndex(0)
    }
  }
  const rowVariants = {
    hidden: (direction: number) => {
      return {
        x: direction > 0 ? global.outerWidth + 5 : -global.outerWidth - 5
      }
    }, 
    visible: {
      x: 0,
    },
    exit: (direction: number) => {
      return {
        x: direction > 0 ? -global.outerWidth - 5 : global.outerWidth + 5
      }
    }, 
  };

  const boxVariants = {
    normal: {
      scale: 1,
    },
    hover: {
      scale: 1.3,
      y: -80,
      transition: {
        delay: 0.5,
        duaration: 0.1,
        type: "tween",
      },
    },
  };

  const infoVariants = {
    hover: {
      opacity: 1,
      transition: {
        delay: 0.5,
        duaration: 0.1,
        type: "tween",
      },
    },
  };

  return (
      <div className='h-full'>
          <div className='h-full relative flex justify-center items-center'>
            <AnimatePresence initial={false} onExitComplete={toggleLeaving} custom={direction}>
              <motion.div key={index} custom={direction} transition={{ type: "tween", duration: 0.35 }} initial="hidden" animate="visible" exit="exit" variants={rowVariants} className='grid gap-1 grid-cols-6 absolute w-full'>
                <span onClick={onPrevClick} className='cursor-pointer absolute top-1/2 left-0 -translate-y-1/2 text-red-500 hover:text-gray-500'>
                  <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z" /></svg>
                </span>
                <span onClick={onNextClick} className='cursor-pointer absolute top-1/2 right-0 -translate-y-1/2 text-blue-500 hover:text-gray-500'>
                  <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </span>
              {
                numArr.slice(OFFSET * index, OFFSET * index + OFFSET).map(cur => 
                  <motion.div className='flex justify-center items-center first:origin-left last:origin-right bg-white h-[200px] text-3xl cursor-pointer ' key={cur} onClick={() => onBoxClicked(cur)} variants={boxVariants} whileHover="hover" initial="normal">
                    <h3 className='text-2xl'>{cur}</h3>
                    <motion.div variants={infoVariants} className='p-2 bg-gray-500 opacity-0 absolute w-full bottom-0'>
                      <h4 className='text-center text-lg'>{cur}</h4>
                    </motion.div>
                  </motion.div>
                )
              }
              </motion.div>
            </AnimatePresence>

          </div>
          { isModalOn ? <div>
            <AnimatePresence>
              {/* overlay */}
              <motion.div onClick={() => setIsModalOn(false)} exit={{ opacity: 0 }}
                        animate={{ opacity: 1 }} className='fixed top-0 left-0 w-full h-full bg-[rgba(0, 0, 0, 0.5)] opacity-0'></motion.div>
              {/* modal */}
              <motion.div style={{top: scrollY.get() + 100}} className='absolute w-[50vw] h-[80vh] left-0 right-0 mx-auto rounded-2xl overflow-hidden bg-gray-400 text-red'>
                something
              </motion.div> 
            </AnimatePresence>
          </div> : null }
        </div>

  )
}

export default Home
