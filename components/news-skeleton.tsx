import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

export function NewsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i} className="overflow-hidden">
          <Skeleton className="h-48 w-full" />
          <CardContent className="py-4">
            <Skeleton className="h-6 w-full mb-2" />
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-full mb-1" />
            <Skeleton className="h-4 w-full mb-1" />
            <Skeleton className="h-4 w-2/3" />
          </CardContent>
          <CardFooter className="flex justify-between pt-0 pb-4">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-24" />
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

