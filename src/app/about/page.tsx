import { Metadata } from "next";
import React from "react";


export const metadata: Metadata = {
  title: "About",

}
export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">About SnowDayCalculator</h1>

      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-3">
            What is SnowDayCalculator?
          </h2>
          <p className="text-gray-700">
            SnowDayCalculator is a free tool that helps people predict the
            likelihood of snow days. It&apos;s my first side project, created to make
            weather prediction more accessible and fun for everyone.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">How It Works</h2>
          <p className="text-gray-700">
            Simply enter your location and our calculator will analyze various
            weather factors to estimate the probability of a snow day. We take
            into account temperature, precipitation chances, and historical
            weather data to make our predictions.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">Why It&apos;s Free</h2>
          <p className="text-gray-700">
            SnowDayCalculator is completely free to use because I believe
            weather predictions should be accessible to everyone. This project
            was built with the community in mind, helping students, parents, and
            teachers plan ahead.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">Get In Touch</h2>
          <p className="text-gray-700">
            Have questions or suggestions? I&apos;d love to hear from you! This is my
            first side project, and I&apos;m always looking for ways to improve it.
            You can reach me at:
          </p>
          <div className="mt-3">
            <p className="text-gray-700">Name: Gowrisankar Kalla</p>
            <p className="text-gray-700">Email: gowrisankarkalla4@gmail.com</p>
          </div>
        </section>
      </div>
    </div>
  );
}
