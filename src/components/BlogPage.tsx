import { ArrowLeft, Calendar, Clock, User } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { blogPosts } from '../data/blog_posts';
import { useParams, useNavigate } from 'react-router-dom';

const categories = ['All Posts', 'Case Studies', 'Academic Research', 'Industry Solutions', 'Regulatory Compliance', 'Clinical Applications', 'Business Development'];

export function BlogPage() {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const selectedPost = postId ? blogPosts.find(post => post.id === postId) : null;

  if (selectedPost) {
    // Show detailed blog post view
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header with back button */}
        <div className="bg-white border-b">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Button
              onClick={() => navigate('/blog')}
              variant="ghost"
              className="flex items-center gap-2 mb-4"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Button>
            
            <div className="mb-6">
              <Badge variant="outline" className="mb-4">
                {selectedPost.category}
              </Badge>
              <h1 className="text-4xl mb-4 text-gray-900">
                {selectedPost.title}
              </h1>
              
              <div className="flex items-center gap-6 text-sm text-gray-600 mb-6">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{selectedPost.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(selectedPost.publishDate).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{selectedPost.readTime}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {selectedPost.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ImageWithFallback
              src={selectedPost.image}
              alt={selectedPost.title}
              className="rounded-lg shadow-lg w-full h-96 object-cover"
            />
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: selectedPost.content }}
          />
          
          {/* Call to Action */}
          <div className="mt-12 p-8 bg-primary rounded-lg text-primary-foreground text-center">
            <h3 className="text-xl mb-4">Ready to Transform Your Laboratory?</h3>
            <p className="mb-6 opacity-90">
              Contact our experts to learn how our calibration standards can improve your analytical capabilities
            </p>
            <Button variant="secondary" size="lg" onClick={() => navigate('/contact')}>
              Get Expert Consultation
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Show blog overview page
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl mb-4 text-gray-900">Laboratory Insights Blog</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover how leading laboratories worldwide are achieving analytical excellence with our calibration standards. Real stories, proven results.
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Badge key={category} variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                {category}
              </Badge>
            ))}
          </div>
        </div>

        {/* FEATURED POST */}
        <div className="mb-12">
          <h2 className="text-2xl mb-6 text-gray-900">Featured Article</h2>
          <Card 
            className="group cursor-pointer hover:shadow-lg transition-all duration-200 overflow-hidden"
            onClick={() => navigate(`/blog/${blogPosts[0].id}`)}
          >
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="relative overflow-hidden">
                <ImageWithFallback
                  src={blogPosts[0].image}
                  alt={blogPosts[0].title}
                  className="w-full h-64 lg:h-full object-cover group-hover:scale-105 transition-transform duration-200"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary">
                    Featured
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-6 flex flex-col justify-center">
                <Badge variant="outline" className="w-fit mb-3">
                  {blogPosts[0].category}
                </Badge>
                
                <h3 className="text-2xl mb-3 text-gray-900 group-hover:text-primary transition-colors">
                  {blogPosts[0].title}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {blogPosts[0].excerpt}
                </p>
                
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    <span>{blogPosts[0].author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>{new Date(blogPosts[0].publishDate).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    })}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{blogPosts[0].readTime}</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {blogPosts[0].tags.slice(0, 3).map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <span className="text-primary font-medium">Read Full Article →</span>
              </CardContent>
            </div>
          </Card>
        </div>

        {/* RECENT POSTS GRID */}
        <div className="mb-12">
          <h2 className="text-2xl mb-6 text-gray-900">Recent Articles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice(1).map((post) => (
              <Card 
                key={post.id} 
                className="group cursor-pointer hover:shadow-lg transition-all duration-200"
                onClick={() => navigate(`/blog/${post.id}`)}
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <ImageWithFallback
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge variant="secondary">
                        {post.category}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-lg mb-2 text-gray-900 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        {new Date(post.publishDate).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </span>
                      <span className="text-sm text-primary font-medium">Read More →</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* NEWSLETTER SIGNUP */}
        <div className="mt-16 bg-primary rounded-lg p-8 text-center text-primary-foreground">
          <h2 className="text-2xl mb-4">Stay Updated with Laboratory Insights</h2>
          <p className="text-lg mb-6 opacity-90">
            Subscribe to our newsletter for the latest analytical techniques, case studies, and industry insights
          </p>
          <Button variant="secondary" size="lg">
            Subscribe to Newsletter
          </Button>
        </div>
      </div>
    </div>
  );
}