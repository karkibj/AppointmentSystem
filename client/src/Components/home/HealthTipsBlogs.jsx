import React from 'react';
import healthyImage from '../home/blogImages/healthy.jpeg';
import exercise from '../home/blogImages/excercise.jpeg';
import hydration from '../home/blogImages/hidration.jpeg';

const blogPosts = [
  {
    id: 1,
    title: 'The Importance of Hydration',
    excerpt: 'Learn why staying hydrated is crucial for your health...',
    image: hydration, // Use the imported variable directly
    link: '/blog/hydration',
  },
  {
    id: 2,
    title: 'Benefits of Regular Exercise',
    excerpt: 'Discover how regular physical activity can improve your life...',
    image: exercise, // Use the imported variable directly
    link: '/blog/exercise',
  },
  {
    id: 3,
    title: 'Healthy Eating Habits',
    excerpt: 'Explore tips for maintaining a balanced diet...',
    image: healthyImage, // Use the imported variable directly
    link: '/blog/eating-habits',
  },
];

const HealthTipsBlog = () => {
  return (
    <section className="py-16 bg-gray-100">
      <h2 className="text-center text-4xl font-bold mb-8">Health Tips Blog</h2>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
        {blogPosts.map(post => (
          <div key={post.id} className="bg-white p-6 rounded-lg shadow-md">
            <img src={post.image} alt={post.title} className="h-40 w-full object-cover mb-4 rounded" />
            <h3 className="text-2xl font-semibold mb-2">{post.title}</h3>
            <p className="text-gray-600">{post.excerpt}</p>
            <a href={post.link} className="text-indigo-600 hover:underline mt-2 block">Read More</a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HealthTipsBlog;
