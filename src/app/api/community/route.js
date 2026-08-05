import { NextResponse } from 'next/server';

let communityPosts = [
  // New Delhi
  {
    id: 1,
    city: 'New Delhi',
    author: 'Rajesh Kumar (Resident)',
    time: '8 mins ago',
    location: 'Connaught Place Block C, New Delhi (0.3 km)',
    category: 'Suspicious Activity',
    description: 'Streetlight outage near Block C lane. PCR check requested. Take Janpath road instead.',
    upvotes: 42,
    comments: [
      { id: 101, user: 'Priya Patel', text: 'Thanks uncle! Taking Janpath main road.' }
    ],
    showComments: false,
    severity: 'Low',
    isUpvoted: false
  },
  {
    id: 2,
    city: 'New Delhi',
    author: 'Aarav Verma (Delhi NCR Safety Watch)',
    time: '1 hour ago',
    location: 'Hauz Khas Ring Road (1.2 km)',
    category: 'Unsafe Area',
    description: 'Waterlogging & temporary low light near Outer Ring flyover due to heavy rains. PCR van 14 is stationed.',
    upvotes: 128,
    comments: [
      { id: 102, user: 'Vikram Singh', text: 'Traffic police is diverting towards IIT gate.' }
    ],
    showComments: false,
    severity: 'Medium',
    isUpvoted: true
  },

  // Gurugram
  {
    id: 3,
    city: 'Gurugram',
    author: 'Gurugram Police Rapid Control',
    time: '3 hours ago',
    location: 'DLF Cyber City Phase 2, Gurugram',
    category: 'Verified Patrol',
    description: 'Active PCR patrol frequency increased for midnight shift. All safe havens verified open 24/7.',
    upvotes: 356,
    comments: [],
    showComments: false,
    severity: 'Low',
    isUpvoted: false
  },

  // Mumbai
  {
    id: 4,
    city: 'Mumbai',
    author: 'Sneha Deshmukh (Bandra Resident)',
    time: '20 mins ago',
    location: 'Bandra Reclamation Promenade, Mumbai',
    category: 'Verified Patrol',
    description: 'Mumbai Police She Team patrolling active along Promenade till 2 AM. Very well lit.',
    upvotes: 89,
    comments: [
      { id: 103, user: 'Rohan Mehta', text: 'Great initiative! Always feel safe walking here at night.' }
    ],
    showComments: false,
    severity: 'Low',
    isUpvoted: true
  },
  {
    id: 5,
    city: 'Mumbai',
    author: 'Karan Shah (Central Suburbs Watch)',
    time: '2 hours ago',
    location: 'BKC Avenue 3 Junction, Mumbai',
    category: 'Suspicious Activity',
    description: 'Road construction causing narrow bypass lane near G Block. Drive slow.',
    upvotes: 64,
    comments: [],
    showComments: false,
    severity: 'Low',
    isUpvoted: false
  },

  // Bengaluru
  {
    id: 6,
    city: 'Bengaluru',
    author: 'Divya Nambiar (Indiranagar Safety Club)',
    time: '15 mins ago',
    location: 'Indiranagar 100ft Road, Bengaluru',
    category: 'Verified Patrol',
    description: 'Bengaluru City Police Hoysala patrol van stationed near Metro Gate 1. CCTV working.',
    upvotes: 112,
    comments: [
      { id: 104, user: 'Anand Rao', text: 'Thanks for updating! Good to see active Hoysala presence.' }
    ],
    showComments: false,
    severity: 'Low',
    isUpvoted: true
  },
  {
    id: 7,
    city: 'Bengaluru',
    author: 'Karthik Gowda (Koramangala Community)',
    time: '45 mins ago',
    location: 'Koramangala 4th Block 80ft Rd, Bengaluru',
    category: 'Unsafe Area',
    description: 'Power cut near 4th block inner lane. Use 80ft main road with streetlights.',
    upvotes: 78,
    comments: [],
    showComments: false,
    severity: 'Medium',
    isUpvoted: false
  },

  // Hyderabad
  {
    id: 8,
    city: 'Hyderabad',
    author: 'Suresh Reddy (Cyberabad Watch)',
    time: '30 mins ago',
    location: 'Mindspace Junction, HITECH City, Hyderabad',
    category: 'Verified Patrol',
    description: 'SHE Teams & Cyberabad Police Pink Mobile patrolling tech parks actively.',
    upvotes: 145,
    comments: [],
    showComments: false,
    severity: 'Low',
    isUpvoted: true
  },

  // Pune
  {
    id: 9,
    city: 'Pune',
    author: 'Pooja Joshi (Viman Nagar Safety)',
    time: '1 hour ago',
    location: 'Viman Nagar Main Avenue, Pune',
    category: 'Verified Patrol',
    description: 'Marshals stationed at Datta Mandir chowk. Well-lit corridor for night commuters.',
    upvotes: 93,
    comments: [],
    showComments: false,
    severity: 'Low',
    isUpvoted: false
  }
];

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const cityQuery = searchParams.get('city');

  let filtered = communityPosts;
  if (cityQuery && cityQuery.toLowerCase() !== 'all') {
    filtered = communityPosts.filter(p => p.city && p.city.toLowerCase().includes(cityQuery.toLowerCase()));
  }

  return NextResponse.json({ success: true, count: filtered.length, posts: filtered });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { action, postId, postText, category, author, commentText } = body;

    if (action === 'upvote') {
      communityPosts = communityPosts.map(p => {
        if (p.id === postId) {
          return {
            ...p,
            upvotes: p.isUpvoted ? p.upvotes - 1 : p.upvotes + 1,
            isUpvoted: !p.isUpvoted
          };
        }
        return p;
      });
      return NextResponse.json({ success: true, posts: communityPosts });
    }

    if (action === 'comment') {
      communityPosts = communityPosts.map(p => {
        if (p.id === postId) {
          const newComment = {
            id: Date.now(),
            user: author || 'Aegis Sentinel User',
            text: commentText || 'Verified update.'
          };
          return {
            ...p,
            comments: [...p.comments, newComment]
          };
        }
        return p;
      });
      return NextResponse.json({ success: true, posts: communityPosts });
    }

    // Create New Post
    const newPost = {
      id: Date.now(),
      author: author || 'Ananya Sharma (You)',
      time: 'Just now',
      location: 'Connaught Place, New Delhi',
      category: category || 'Suspicious Activity',
      description: postText || 'Community safety update.',
      upvotes: 1,
      comments: [],
      showComments: false,
      severity: 'Medium',
      isUpvoted: true
    };

    communityPosts.unshift(newPost);
    return NextResponse.json({ success: true, post: newPost, posts: communityPosts });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
