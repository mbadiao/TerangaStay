"use client";

import Image from "next/image";
import React from "react";
import { CardItem, CardContainer, CardBody } from "@/components/3d-card";
import Link from "next/link";

export function ThreeDCard({ _id, title, uploadedImageIds, description }) {
  return (
    <section className="py-7 md:py-10 lg:py-24">
      <div className="flex flex-row flex-wrap justify-center items-center">
        <CardContainer className="inter-var">
          <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full sm:w-[30rem] h-auto rounded-xl p-6 border">
            <Link href={`/rooms/${_id}`} passHref>
              <>
                <CardItem
                  translateZ="50"
                  className="text-xl font-bold text-neutral-600 dark:text-white"
                >
                  {title}
                </CardItem>
              </>
            </Link>

            <CardItem translateZ="100" className="w-full mt-4">
              <Image
                src={uploadedImageIds?.[0]}
                width={300}
                height={300}
                className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                alt="thumbnail"
              />
            </CardItem>
            <CardItem
              as="p"
              translateZ="60"
              className="text-neutral-500 text-sm w-full max-w-sm mt-2 dark:text-neutral-300"
            >
              {description}
            </CardItem>
            <div className="flex justify-between items-center mt-10">
              <CardItem
                translateZ={20}
                as={Link}
                href={`/rooms/${_id}`}
                className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
              >
                Book Now →
              </CardItem>
              <CardItem
                translateZ={20}
                as="button"
                className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
              >
                View Details
              </CardItem>
            </div>
          </CardBody>
        </CardContainer>
      </div>
    </section>
  );
}
