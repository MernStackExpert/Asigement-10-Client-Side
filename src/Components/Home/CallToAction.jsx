import { useContext } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { FaRocket, FaArrowRight, FaChartLine } from "react-icons/fa";
import { AuthContext } from "../../Provider/AuthContext";

const CallToAction = () => {
  const { user } = useContext(AuthContext);

  return (
    <section className="py-20 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4"
      >
        <div className="bg-base-200 border border-base-300 rounded-[3rem] p-10 md:p-20 text-center relative overflow-hidden shadow-sm">
          <div className="absolute top-0 left-0 w-32 h-32 bg-primary/5 rounded-full -ml-16 -mt-16 blur-2xl"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-secondary/5 rounded-full -mr-16 -mb-16 blur-2xl"></div>

          <div className="relative z-10 max-w-3xl mx-auto">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-primary/10 text-primary px-5 py-2 rounded-full font-bold text-sm mb-8"
            >
              {user ? <FaChartLine /> : <FaRocket />}
              {user ? "WELCOME BACK" : "START YOUR JOURNEY"}
            </motion.div>

            <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
              {user ? (
                <> Continue Your <span className="text-primary">Financial Success</span> </>
              ) : (
                <> Ready to Take <span className="text-primary">Control?</span> </>
              )}
            </h2>

            <p className="text-xl text-base-content/60 mb-12">
              {user
                ? "You're already on your way! Head over to your dashboard to see your latest financial trends and insights."
                : "Join thousands of users who are mastering their money every day. Start your journey towards financial independence today."}
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              {user ? (
                <Link
                  to="/reports"
                  className="btn btn-primary btn-lg rounded-full px-10 gap-3 shadow-xl shadow-primary/20 group"
                >
                  Check My Reports
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
              ) : (
                <>
                  <Link
                    to="/auth/register"
                    className="btn btn-primary btn-lg rounded-full px-10 gap-3 shadow-xl shadow-primary/20 group"
                  >
                    Create Free Account
                    <FaRocket className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    to="/auth/login"
                    className="btn btn-outline btn-lg rounded-full px-10"
                  >
                    Sign In
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default CallToAction;