import React from "react";

const Skeleton = ({ className }: { className: string }) => {
  return <div className={`bg-gray-300 animate-pulse ${className}`} />;
};

const Loading = () => {
  return (
    <div className="container mx-auto p-6 space-y-4">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-[500px] w-full" />
      <Skeleton className="h-8 w-32" />
      <Skeleton className="h-8 w-32" />
      <Skeleton className="h-8 w-32" />
    </div>
  );
};

export default Loading;
