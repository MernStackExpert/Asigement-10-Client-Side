import { motion } from "framer-motion";
import { FaArrowRight, FaCalendarAlt, FaClock } from "react-icons/fa";

const RecentBlogs = () => {
  const blogs = [
    {
      id: 1,
      title: "10 Smart Ways to Save Money in 2026",
      excerpt: "Discover the latest strategies to build your savings without compromising your lifestyle.",
      image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=500&auto=format&fit=crop",
      date: "Jan 02, 2026",
      readTime: "5 min read",
      category: "Savings"
    },
    {
      id: 2,
      title: "Understanding Investment Basics",
      excerpt: "A beginner's guide to stocks, bonds, and mutual funds to help you grow your wealth.",
      image: "https://incuassetmanagement.com/wp-content/uploads/2024/06/image_2024_06_11T09_40_01_927Z-1.png",
      date: "Dec 28, 2025",
      readTime: "8 min read",
      category: "Investment"
    },
    {
      id: 3,
      title: "How to Build an Emergency Fund",
      excerpt: "Learn why an emergency fund is crucial and how much you should realistically save.",
      image: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?q=80&w=500&auto=format&fit=crop",
      date: "Dec 15, 2025",
      readTime: "6 min read",
      category: "Planning"
    }
  ];

  return (
    <section className="py-16 bg-base-100">
      <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 gap-4 text-center md:text-left">
        <div>
          <h2 className="text-4xl font-black mb-2 tracking-tight uppercase">
            Financial <span className="text-primary">Insights</span>
          </h2>
          <p className="text-base-content/60">Expert tips and guides to master your personal finances.</p>
        </div>
       
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {blogs.map((blog, idx) => (
          <motion.div
            key={blog.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="group bg-base-100 border border-base-300 rounded-[2rem] overflow-hidden hover:shadow-2xl transition-all duration-500"
          >
            {/* Image Section */}
            <div className="relative overflow-hidden h-56">
              <img
                src={blog.image}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                alt={blog.title}
              />
              <div className="absolute top-4 left-4">
                <span className="badge badge-primary font-bold px-4 py-3">{blog.category}</span>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-8">
              <div className="flex items-center gap-4 text-xs opacity-60 mb-4 uppercase tracking-widest font-bold">
                <span className="flex items-center gap-1"><FaCalendarAlt /> {blog.date}</span>
                <span className="flex items-center gap-1"><FaClock /> {blog.readTime}</span>
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors leading-tight">
                {blog.title}
              </h3>
              <p className="text-base-content/70 text-sm mb-6 line-clamp-2">
                {blog.excerpt}
              </p>
             
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default RecentBlogs;