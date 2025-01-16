import Image from 'next/image';
import Link from 'next/link';

import gamesData from '@/data/games-data';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

const Games = () => {
    return (
      <div className="min-h-screen py-10 ">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-6">
            Gaming Zone - Fun for Everyone
          </h1>
          <h3 className="text-xl text-center mb-8">First Select a Game</h3>
          <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6 items-center justify-center">
            {gamesData.map((game, index) => (
              <Link key={index} 
              href={{
                pathname: 'http://localhost:5173',
                // query: { title: game.title },
                
              }}>
  
  
                <Card className="justify-center items-center group relative block w-[300px] h-[100px] bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-104 hover:border-2 hover:border-indigo-500 duration-4000 ease-out" style={{ height: '400px' }}>
                  <CardHeader>
                    <div className="relative h-45 w-45 items-center justify-center mx-auto">
                      {/* <Image
                        src={game.imgSrc}
                        alt={game.title}
                        layout="fill"
                        objectFit="cover"
                        className="group-hover:opacity-90 transition-opacity duration-2000 ease-in-out rounded-lg"
                      /> */}
  
                      <Image
                        src={game.imgSrc}
                        width={240}
                        height={240}
                        alt={game.title}
                        priority
                      />
  
                    </div>
                    <CardTitle className="text-gray-600 group-hover:text-indigo-500 transition-colors duration-2000 ease-in-out text-center p-4">
                      {game.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600 group-hover:text-gray-800 transition-colors duration-2000 ease-in-out text-center">
                      {game.description}
                    </CardDescription>
                  </CardHeader>
  
                </Card>
              </Link>
            ))}
          </div>
          {/* <div className="text-center mt-10">
            <Link
              href="/account/basicsignup?ref=home-cta"
              className="inline-block bg-orange-500 text-white py-3 px-6 rounded-lg text-lg hover:bg-blue-600 transition-colors duration-2000 ease-in-out"
            >
              Start Learning
            </Link>
          </div> */}
        </div>
      </div>
    );
  };
  
export default Games;
  