import { motion } from "framer-motion";
import { FaPaperPlane, FaEnvelopeOpenText } from "react-icons/fa";
import { toast } from "react-toastify";

const Newsletter = () => {
  const handleSubscribe = (e) => {
    e.preventDefault();
    toast.success("Welcome to the community!");
    e.target.reset();
  };

  return (
    <section className="py-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden bg-base-100 border border-base-300 rounded-[3rem] p-8 md:p-16 shadow-xl"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full -ml-32 -mb-32 blur-3xl"></div>

        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full text-primary text-sm font-bold mb-6"
            >
              <FaEnvelopeOpenText /> Subscribe to Newsletter
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl font-black text-base-content mb-6 leading-tight"
            >
              Master Your Money <br />
              <span className="text-primary text-3xl md:text-4xl">With Weekly Insights</span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-base-content/60 text-lg max-w-md mx-auto lg:mx-0"
            >
              Join 10,000+ users getting expert financial tips, market trends, and saving strategies delivered to their inbox.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="flex-1 w-full max-w-lg"
          >
            <form
              onSubmit={handleSubscribe}
              className="bg-base-200/50 p-6 md:p-10 rounded-[2.5rem] border border-base-300 shadow-sm"
            >
              <div className="flex flex-col gap-4">
                <div className="form-control">
                  <input
                    type="email"
                    placeholder="yourname@example.com"
                    className="input input-lg w-full bg-base-200 border-base-500 text-base-content rounded-2xl focus:input-primary transition-all placeholder:text-base-content/30"
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  className="btn btn-lg btn-primary text-white rounded-2xl gap-3 group shadow-lg shadow-primary/20"
                >
                  Join Now
                  <FaPaperPlane className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </div>
              
              <p className="text-base-content/40 text-[11px] uppercase tracking-widest text-center mt-6 font-medium">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Newsletter;