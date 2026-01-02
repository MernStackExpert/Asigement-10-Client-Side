import { motion } from "framer-motion";
import { FaQuestionCircle } from "react-icons/fa";

const FAQ = () => {
  const faqData = [
    {
      id: 1,
      question: "Is FinEase free to use?",
      answer: "Yes! Our basic tracking features are 100% free forever for all users.",
      defaultOpen: true
    },
    {
      id: 2,
      question: "How do I export my data?",
      answer: "Currently, you can view reports online. The PDF and CSV export feature is coming in the next update!",
      defaultOpen: false
    },
    {
      id: 3,
      question: "Can I add multiple currencies?",
      answer: "Right now we support USD, but multi-currency support is in our development roadmap.",
      defaultOpen: false
    },
    {
      id: 4,
      question: "Is my financial data secure?",
      answer: "Absolutely. We use JWT authentication and Firebase security to ensure your data stays private and encrypted.",
      defaultOpen: false
    },
    {
      id: 5,
      question: "Can I track both income and expenses?",
      answer: "Yes, FinEase allows you to create, update, and delete both income and expense transactions easily.",
      defaultOpen: false
    },
    {
      id: 6,
      question: "Does it support Dark Mode?",
      answer: "Yes! FinEase has a built-in light and dark mode toggle to protect your eyes during night use.",
      defaultOpen: false
    },
    {
      id: 7,
      question: "How can I reset my password?",
      answer: "You can reset your password through the Firebase authentication link on the login page.",
      defaultOpen: false
    }
  ];

  return (
    <section className="py-20 bg-base-100">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-bold uppercase tracking-widest text-sm">Have Questions?</span>
          <h2 className="text-4xl lg:text-5xl font-black mt-2">Frequently Asked <span className="text-primary">Questions</span></h2>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Left Side: Illustration or Image */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex-1 hidden lg:block sticky top-24"
          >
            <img 
              src="https://images.unsplash.com/photo-1554224154-26032ffc0d07?q=80&w=600&auto=format&fit=crop" 
              alt="FAQ Illustration" 
              className="rounded-[3rem] shadow-2xl border-8 border-base-200 h-[500px] object-cover"
            />
            <div className="absolute -bottom-6 -left-6 bg-primary p-8 rounded-3xl shadow-xl text-primary-content">
              <FaQuestionCircle className="text-5xl mb-2" />
              <p className="font-bold text-lg">Still need help?</p>
              <p className="text-sm opacity-80">Contact our support team 24/7</p>
            </div>
          </motion.div>

          {/* Right Side: Accordion */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex-1 w-full space-y-4"
          >
            {faqData.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="collapse collapse-plus bg-base-200 border border-base-300 rounded-2xl hover:border-primary transition-colors"
              >
                <input type="radio" name="faq-accordion" defaultChecked={faq.defaultOpen} /> 
                <div className="collapse-title text-xl font-bold py-5 px-6">
                  {faq.question}
                </div>
                <div className="collapse-content px-6">
                  <p className="text-base-content/70 leading-relaxed border-t border-base-300 pt-4">
                    {faq.answer}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;