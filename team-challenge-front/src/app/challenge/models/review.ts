
export interface TeamReview {
  id?: string;
  challengeId: string;
  reviewingTeamId?: string;
  reviewedTeamId?: string;
  fairPlayLevel: number;
  playAgain: boolean;
  reviewDate?: string;
}
