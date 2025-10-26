import React, { useEffect, useState, useRef } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2, Mail, Lock } from 'lucide-react'
import store from '@/redux/store'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

const HERO_IMG = '/logImage.jpg'

export const Login = () => {
  const [input, setInput] = useState({ email: '', password: '', role: '' })
  const { loading, user } = useSelector(store => store.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // ----- Card tilt / spotlight -----
  const cardRef = useRef(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const smx = useSpring(mx, { stiffness: 120, damping: 20 })
  const smy = useSpring(my, { stiffness: 120, damping: 20 })
  const rotateX = useTransform(smy, [-50, 50], [8, -8])
  const rotateY = useTransform(smx, [-50, 50], [-8, 8])

  const handleMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const midX = rect.width / 2
    const midY = rect.height / 2
    mx.set(((x - midX) / midX) * 50)
    my.set(((y - midY) / midY) * 50)
    cardRef.current.style.setProperty('--mx', `${x}px`)
    cardRef.current.style.setProperty('--my', `${y}px`)
  }
  const handleMouseLeave = () => { mx.set(0); my.set(0) }

  // ----- Image hover parallax -----
  const ix = useMotionValue(0)
  const iy = useMotionValue(0)
  const irot = useMotionValue(0)
  const six = useSpring(ix, { stiffness: 120, damping: 18 })
  const siy = useSpring(iy, { stiffness: 120, damping: 18 })
  const sirot = useSpring(irot, { stiffness: 120, damping: 18 })
  const imageMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2 // -1..1
    const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2
    ix.set(nx * 12)     // up to 12px
    iy.set(ny * 10)
    irot.set(nx * -2.5) // light tilt
  }
  const imageLeave = () => { ix.set(0); iy.set(0); irot.set(0) }

  const changeEventHandler = (e) => setInput({ ...input, [e.target.name]: e.target.value })

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      dispatch(setLoading(true))
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      })
      if (res.data.success) {
        dispatch(setUser(res.data.user))
        navigate('/')
        toast.success(res.data.message)
      }
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Something went wrong!'
      toast.error(message)
    } finally {
      dispatch(setLoading(false))
    }
  }

  useEffect(() => { if (user) navigate('/') }, []) // eslint-disable-line

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#eef6ff_0%,#eaf3ff_15%,#d9ecff_40%,#cde6ff_60%,#bfe0ff_80%,#b7ddff_100%)] relative overflow-hidden">
      <Navbar />

      {/* Background blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-blue-300/40 blur-3xl animate-blob" />
        <div className="absolute top-1/4 -right-24 h-72 w-72 rounded-full bg-sky-300/40 blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-[-80px] left-1/4 h-96 w-96 rounded-full bg-indigo-300/30 blur-3xl animate-blob animation-delay-4000" />
      </div>

      {/* Floating dots */}
      <div className="pointer-events-none absolute inset-0">
        {Array.from({ length: 16 }).map((_, i) => (
          <span
            key={i}
            className="absolute h-1.5 w-1.5 rounded-full bg-blue-500/30 animate-float"
            style={{
              top: `${Math.random() * 90 + 5}%`,
              left: `${Math.random() * 90 + 5}%`,
              animationDelay: `${(i % 10) * 0.4}s`,
              animationDuration: `${6 + (i % 5)}s`
            }}
          />
        ))}
      </div>

      {/* ===== Centered two-column layout (pushed a bit lower) ===== */}
      <main className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="grid min-h-[calc(100vh-160px)] place-items-center gap-12 py-16 lg:grid-cols-2 lg:gap-14 lg:py-20">

          {/* LEFT: Image (intrinsic sizing + hover parallax) */}
          <motion.div
            className="w-full flex justify-center lg:justify-start"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              onMouseMove={imageMove}
              onMouseLeave={imageLeave}
              whileHover={{ scale: 1.02 }}
              style={{ x: six, y: siy, rotate: sirot }}
              className="rounded-3xl border border-white/40 bg-white/30 shadow-[0_12px_46px_rgba(15,70,140,0.12)] backdrop-blur-xl p-3"
            >
              <img
                src={HERO_IMG}
                alt="Welcome"
                className="h-auto w-auto max-w-[640px] max-h-[72vh] object-contain rounded-2xl"
                draggable={false}
              />
            </motion.div>
          </motion.div>

          {/* RIGHT: Bigger login card */}
          <div className="w-full flex justify-center">
            {/* Spotlight for the card */}
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none"
              style={{
                maskImage: 'radial-gradient(220px 220px at var(--sx,50%) var(--sy,50%), black, transparent 70%)'
              }}
            />
            <motion.form
              ref={cardRef}
              onMouseMove={(e) => {
                const { clientX, clientY } = e
                handleMouseMove(e)
                document.documentElement.style.setProperty('--sx', `${clientX}px`)
                document.documentElement.style.setProperty('--sy', `${clientY}px`)
              }}
              onMouseLeave={handleMouseLeave}
              onSubmit={submitHandler}
              style={{ rotateX, rotateY }}
              className="relative w-full max-w-lg rounded-2xl border border-white/30 bg-white/30 p-10 shadow-[0_10px_46px_rgba(15,70,140,0.15)] backdrop-blur-xl will-change-transform
                         before:pointer-events-none before:absolute before:inset-0 before:rounded-2xl
                         before:bg-[radial-gradient(220px_220px_at_var(--mx,50%)_var(--my,50%),rgba(21,112,239,0.18),transparent_60%)]"
            >
              <div className="mb-6 text-center">
                <motion.h1
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="text-3xl md:text-4xl font-extrabold leading-tight text-[#0B2C5E]"
                >
                  Ready to hack the future?
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.35 }}
                  className="mt-1 text-[15px] text-[#1f3b6b]/80"
                >
                  Log in and <span className="bg-gradient-to-r from-[#1570EF] to-[#54A7FF] bg-clip-text font-semibold text-transparent">find your crew</span>.
                </motion.p>
              </div>

              {/* Email */}
              <div className="my-3">
                <Label htmlFor="email" className="text-[#0B2C5E] text-sm">Email</Label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#1570EF]/60" />
                  <Input
                    id="email"
                    type="email"
                    value={input.email}
                    name="email"
                    onChange={(e)=>setInput({...input, email:e.target.value})}
                    placeholder="you@hackmate.dev"
                    className="my-2 h-12 text-[15px] pl-9 border-blue-200/70 focus-visible:ring-[#1570EF] bg-white/70"
                    required
                    autoComplete="email"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="my-3">
                <Label htmlFor="password" className="text-[#0B2C5E] text-sm">Password</Label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#1570EF]/60" />
                  <Input
                    id="password"
                    type="password"
                    value={input.password}
                    name="password"
                    onChange={(e)=>setInput({...input, password:e.target.value})}
                    placeholder="Enter your password"
                    className="my-2 h-12 text-[15px] pl-9 border-blue-200/70 focus-visible:ring-[#1570EF] bg-white/70"
                    required
                    autoComplete="current-password"
                  />
                </div>
              </div>

              {/* Role */}
              <div className="my-5">
                <Label className="text-[#0B2C5E] text-sm">Role</Label>
                <div className="mt-2 grid grid-cols-3 gap-2 rounded-xl bg-white/50 p-1 shadow-inner">
                  {[
                    { value: 'hackLead', label: 'Hack Lead' },
                    { value: 'hackApplicant', label: 'Hack Applicant' },
                    { value: 'collegeAdmin', label: 'College Admin' },
                  ].map((r) => {
                    const active = input.role === r.value
                    return (
                      <motion.button
                        key={r.value}
                        type="button"
                        whileHover={{ y: -1 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setInput(prev => ({ ...prev, role: r.value }))}
                        className={[
                          'rounded-lg px-3 py-3 text-[15px] font-medium transition-all',
                          active
                            ? 'bg-gradient-to-r from-[#1570EF] to-[#54A7FF] text-white shadow-sm'
                            : 'text-[#0B2C5E] hover:bg-blue-50/80'
                        ].join(' ')}
                        aria-pressed={active}
                      >
                        {r.label}
                      </motion.button>
                    )
                  })}
                </div>
              </div>

              {/* Submit */}
              {loading ? (
                <Button disabled className="w-full my-4 !cursor-pointer h-12 text-[15px] bg-[#1570EF]">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                </Button>
              ) : (
                <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    type="submit"
                    className="relative w-full my-4 !cursor-pointer h-12 text-[15px] overflow-hidden
                               bg-gradient-to-r from-[#1570EF] to-[#54A7FF] hover:opacity-95"
                  >
                    <span className="relative z-10">Login</span>
                    <span className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.45),transparent)] transition-transform duration-700 ease-out hover:translate-x-full" />
                  </Button>
                </motion.div>
              )}

              <p className="text-center text-sm text-[#1f3b6b]/80">
                Don&apos;t have an account?{' '}
                <Link to="/signup" className="font-semibold text-[#1570EF] hover:underline">
                  Sign up
                </Link>
              </p>
            </motion.form>
          </div>
        </div>
      </main>

      {/* Keyframes */}
      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(20px, -10px) scale(1.05); }
          66% { transform: translate(-10px, 10px) scale(0.98); }
        }
        .animate-blob { animation: blob 18s ease-in-out infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }

        @keyframes float {
          0% { transform: translateY(0) scale(1); opacity: .35; }
          50% { transform: translateY(-12px) scale(1.02); opacity: .6; }
          100% { transform: translateY(0) scale(1); opacity: .35; }
        }
        .animate-float { animation: float 8s ease-in-out infinite; }
      `}</style>
    </div>
  )
}

export default Login
