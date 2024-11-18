import React, { useState } from 'react'
import { Video, Mic, MicOff, VideoOff } from 'lucide-react'

const ConsultationPage: React.FC = () => {
  const [isVideoOn, setIsVideoOn] = useState(true)
  const [isAudioOn, setIsAudioOn] = useState(true)

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <Video className="mr-2" /> Video Consultation
      </h1>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="aspect-w-16 aspect-h-9 bg-gray-800">
          {/* This would be replaced with actual video stream */}
          <div className="flex items-center justify-center text-white text-2xl">
            Video Stream Placeholder
          </div>
        </div>
        <div className="p-4">
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setIsAudioOn(!isAudioOn)}
              className={`p-2 rounded-full ${
                isAudioOn ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
              }`}
            >
              {isAudioOn ? <Mic size={24} /> : <MicOff size={24} />}
            </button>
            <button
              onClick={() => setIsVideoOn(!isVideoOn)}
              className={`p-2 rounded-full ${
                isVideoOn ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
              }`}
            >
              {isVideoOn ? <Video size={24} /> : <VideoOff size={24} />}
            </button>
          </div>
          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-2">Consultation Notes</h2>
            <textarea
              className="w-full h-32 p-2 border rounded"
              placeholder="Type your notes here..."
            ></textarea>
          </div>
          <button className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            End Consultation
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConsultationPage