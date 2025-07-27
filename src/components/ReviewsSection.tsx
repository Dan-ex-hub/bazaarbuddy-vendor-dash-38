import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, MessageSquare } from "lucide-react";

interface Review {
  id: string;
  vendorName: string;
  wholesalerName: string;
  rating: number;
  comment: string;
  date: string;
  orderValue: number;
  avatar?: string;
}

const reviews: Review[] = [
  {
    id: "1",
    vendorName: "Rajesh Sharma",
    wholesalerName: "Fresh Valley Wholesalers",
    rating: 5,
    comment: "Excellent quality vegetables and timely delivery. The tomatoes were fresh and perfectly ripe. Will definitely order again!",
    date: "2 days ago",
    orderValue: 2500
  },
  {
    id: "2", 
    vendorName: "Priya Patel",
    wholesalerName: "Spice Garden Suppliers",
    rating: 4,
    comment: "Good variety of spices. Packaging could be better but overall satisfied with the quality and pricing.",
    date: "1 week ago",
    orderValue: 1800
  },
  {
    id: "3",
    vendorName: "Mohammed Ali",
    wholesalerName: "Organic Harvest Co.",
    rating: 5,
    comment: "Best wholesaler in the area! Always provides fresh ingredients and fair prices. Premium quality organic products.",
    date: "2 weeks ago",
    orderValue: 3200
  },
  {
    id: "4",
    vendorName: "Sunita Devi",
    wholesalerName: "City Mart Wholesale",
    rating: 4,
    comment: "Regular supplier for 6 months. Consistent quality and good customer service. Quick response to queries.",
    date: "3 weeks ago",
    orderValue: 1500
  }
];

const ReviewsSection = () => {
  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating ? "text-accent fill-accent" : "text-muted-foreground"
        }`}
      />
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Your Reviews of Wholesalers</h2>
        <div className="flex items-center space-x-2 bg-gradient-card rounded-xl px-4 py-2 shadow-card">
          <div className="flex">{renderStars(Math.round(averageRating))}</div>
          <span className="font-semibold text-foreground">{averageRating.toFixed(1)}</span>
          <span className="text-muted-foreground">({reviews.length} reviews)</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reviews.map((review) => (
          <Card key={review.id} className="bg-gradient-card border border-border shadow-card hover:shadow-float transition-all duration-300 rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={review.avatar} alt={review.vendorName} />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {review.vendorName.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-foreground">{review.vendorName}</h4>
                      <p className="text-sm text-primary">reviewed {review.wholesalerName}</p>
                    </div>
                    <span className="text-sm text-muted-foreground">{review.date}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      {renderStars(review.rating)}
                    </div>
                    <span className="text-sm text-secondary font-medium">₹{review.orderValue}</span>
                  </div>
                  
                  <p className="text-muted-foreground leading-relaxed">{review.comment}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-gradient-primary rounded-2xl shadow-float">
        <CardContent className="p-6 text-center">
          <MessageSquare className="h-12 w-12 text-white mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Share Your Experience</h3>
          <p className="text-white/90">Help other vendors by reviewing wholesalers you've ordered from!</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReviewsSection;