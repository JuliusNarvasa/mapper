import { useQueryClient, useMutation } from '@tanstack/react-query';
import { putAnnotations } from '../../services/annotations/put-annotations';
import { getUseAnnotationsQueryKey } from '../queries/use-annotations-query';
import { getUseAnnotationQueryKey } from '../queries/use-annotation-query';

export const usePutAnnotation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: putAnnotations,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: getUseAnnotationQueryKey({
          annotationId: variables.data.annotationId,
          canvasId: variables.data.canvasId,
        }),
      });
      queryClient.invalidateQueries({
        queryKey: getUseAnnotationsQueryKey({
          canvasId: variables.data.canvasId,
        }),
      });
    },
  });
};
