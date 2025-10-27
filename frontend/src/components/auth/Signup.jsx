import React, { useEffect, useState, useRef } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setLoading } from '@/redux/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Loader2, Mail, Lock, User, Phone } from 'lucide-react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

const HERO_IMG = '/signImage.jpg'

export const Signup = () => {
  const [input, setInput] = useState({
    fullname: '',
    email: '',
    phoneNumber: '',
    password: '',
    role: '',
    file: ''
  })

  const navigate = useNavigate()
  const { loading, user } = useSelector(s => s.auth)
  const dispatch = useDispatch()

  const changeEventHandler = (e) => setInput({ ...input, [e.target.name]: e.target.value })
  const changeFileHandler = (e) => setInput({ ...input, file: e.target.files?.[0] })

  const submitHandler = async (e) => {
    e.preventDefault()
    if (!input.fullname?.trim()) return toast.error('Full name is required')
    if (!input.email?.trim()) return toast.error('Email is required')
    if (!input.password || input.password.length < 6) return toast.error('Password must be at least 6 characters')
    if (!input.role) return toast.error('Please select a role')

    const formData = new FormData()
    formData.append('fullname', input.fullname)
    formData.append('email', input.email)
    formData.append('phoneNumber', input.phoneNumber)
    formData.append('password', input.password)
    formData.append('role', input.role)
    if (input.file) formData.append('file', input.file)

    try {
      dispatch(setLoading(true))
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      })
      if (res.data?.success) {
        toast.success(res.data.message || 'Account created! Please log in.')
        navigate('/login')
      }
    } catch (error) {
      const msg = error.response?.data?.message || error.message || 'Something went wrong!'
      toast.error(msg)
    } finally {
      dispatch(setLoading(false))
    }
  }

  useEffect(() => { if (user) navigate('/') }, []) // eslint-disable-line

  // Motion/tilt effects
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

  const ix = useMotionValue(0)
  const iy = useMotionValue(0)
  const irot = useMotionValue(0)
  const six = useSpring(ix, { stiffness: 120, damping: 18 })
  const siy = useSpring(iy, { stiffness: 120, damping: 18 })
  const sirot = useSpring(irot, { stiffness: 120, damping: 18 })
  const imageMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2
    const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2
    ix.set(nx * 12)
    iy.set(ny * 10)
    irot.set(nx * -2.5)
  }
  const imageLeave = () => { ix.set(0); iy.set(0); irot.set(0) }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#eef6ff_0%,#eaf3ff_15%,#d9ecff_40%,#cde6ff_60%,#bfe0ff_80%,#b7ddff_100%)] relative overflow-hidden">
      <Navbar />

      {/* Soft blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-blue-300/40 blur-3xl animate-blob" />
        <div className="absolute top-1/4 -right-24 h-56 w-56 rounded-full bg-sky-300/40 blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-[-80px] left-1/4 h-72 w-72 rounded-full bg-indigo-300/30 blur-3xl animate-blob animation-delay-4000" />
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

      {/* === Center Layout (More Top Gap + Larger Image) === */}
      <main className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="grid min-h-[calc(100vh-130px)] place-items-center gap-10 md:gap-12 lg:grid-cols-2 lg:gap-16 py-17 lg:py-20">

          {/* LEFT: Signup Box */}
          <motion.form
            ref={cardRef}
            onMouseMove={(e) => {
              handleMouseMove(e)
              document.documentElement.style.setProperty('--sx', `${e.clientX}px`)
              document.documentElement.style.setProperty('--sy', `${e.clientY}px`)
            }}
            onMouseLeave={handleMouseLeave}
            onSubmit={submitHandler}
            style={{ rotateX, rotateY }}
            className="relative w-full max-w-[39rem] rounded-2xl border border-white/30 bg-white/30 p-6 shadow-[0_10px_36px_rgba(15,70,140,0.15)] backdrop-blur-xl
                       before:pointer-events-none before:absolute before:inset-0 before:rounded-2xl
                       before:bg-[radial-gradient(180px_180px_at_var(--mx,50%)_var(--my,50%),rgba(21,112,239,0.18),transparent_60%)]"
          >
            <div className="mb-4 text-center">
              <h1 className="text-[25px] font-extrabold text-[#0B2C5E]">Create your account</h1>
              <p className="text-[14.5px] text-[#1f3b6b]/80">
                Join the <span className="bg-gradient-to-r from-[#1570EF] to-[#54A7FF] bg-clip-text font-semibold text-transparent">Hackmate</span> community.
              </p>
            </div>

            {[
              { label: 'Full Name', id: 'fullname', icon: <User />, placeholder: 'Enter your name' },
              { label: 'Email', id: 'email', icon: <Mail />, placeholder: 'you@hackmate.dev' },
              { label: 'Phone Number', id: 'phoneNumber', icon: <Phone />, placeholder: 'Enter your phone number' },
              { label: 'Password', id: 'password', icon: <Lock />, placeholder: 'Enter your password', type: 'password' },
            ].map((field, idx) => (
              <div key={idx} className="my-2">
                <Label htmlFor={field.id} className="text-[#0B2C5E] text-[13px]">{field.label}</Label>
                <div className="relative">
                  {React.cloneElement(field.icon, { className: 'pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#1570EF]/60' })}
                  <Input
                    id={field.id}
                    name={field.id}
                    type={field.type || 'text'}
                    value={input[field.id]}
                    onChange={changeEventHandler}
                    placeholder={field.placeholder}
                    className="my-2 h-9 text-[13.5px] pl-9 border-blue-200/70 focus-visible:ring-[#1570EF] bg-white/70"
                    required
                  />
                </div>
              </div>
            ))}

            <div className="my-3">
              <Label className="text-[#0B2C5E] text-[13px]">Role</Label>
              <div className="mt-2 grid grid-cols-3 gap-1.5 rounded-xl bg-white/60 p-1 shadow-inner">
                {['Hack Lead', 'Hack Applicant', 'College Admin'].map((r) => {
                  const value = r.replace(' ', '').toLowerCase()
                  const active = input.role === value
                  return (
                    <motion.button
                      key={r}
                      type="button"
                      whileHover={{ y: -1 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setInput(prev => ({ ...prev, role: value }))}
                      className={[
                        'rounded-lg px-3 py-1.5 text-[13px] font-medium transition-all',
                        active
                          ? 'bg-gradient-to-r from-[#1570EF] to-[#54A7FF] text-white shadow-sm'
                          : 'text-[#0B2C5E] hover:bg-blue-50/80'
                      ].join(' ')}
                    >
                      {r}
                    </motion.button>
                  )
                })}
              </div>
            </div>

            <div className="my-2">
              <Label className="text-[#0B2C5E] text-[13px]">Profile</Label>
              <Input accept="image/*" type="file" onChange={changeFileHandler} className="cursor-pointer my-2 h-10 text-[13.5px]" />
            </div>

            {loading ? (
              <Button disabled className="w-full my-3 h-10 text-[13.5px] bg-[#1570EF]">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
              </Button>
            ) : (
              <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}>
                <Button type="submit" className="w-full h-10 text-[13.5px] bg-gradient-to-r from-[#1570EF] to-[#54A7FF] hover:opacity-95">
                  Sign up
                </Button>
              </motion.div>
            )}

            <p className="text-center text-[13px] text-[#1f3b6b]/80">
              Already have an account?{' '}
              <Link to="/login" className="font-semibold text-[#1570EF] hover:underline">
                Login
              </Link>
            </p>
          </motion.form>

          {/* RIGHT: Larger Image */}
          <motion.div
            className="w-full flex justify-center lg:justify-end"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            <motion.div
              onMouseMove={imageMove}
              onMouseLeave={imageLeave}
              whileHover={{ scale: 1.02 }}
              style={{ x: six, y: siy, rotate: sirot }}
              className="rounded-3xl border border-white/40 bg-white/30 shadow-[0_12px_36px_rgba(15,70,140,0.12)] backdrop-blur-xl p-3"
            >
              <img
                src={HERO_IMG}
                alt="Welcome"
                className="h-auto w-auto max-w-[600px] max-h-[58vh] object-contain rounded-xl"
                draggable={false}
              />
            </motion.div>
          </motion.div>
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

export default Signup
