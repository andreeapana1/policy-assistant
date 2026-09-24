window.RESULTS = {
 "meta": {
  "generated_at": "2026-09-24 09:21 UTC",
  "gen_model": "gemini-3.5-flash-lite",
  "embed_model": "gemini-embedding-001",
  "top_k": 3,
  "n_policies": 98,
  "n_questions": 22,
  "indexing_tokens_estimate": 2556
 },
 "summary": {
  "rules": {
   "label": "Rules-based search",
   "policy_accuracy": 0.6818181818181818,
   "unsupported_rate": 0.2727272727272727,
   "unsupported_count": 6,
   "abstain_rate": 0.5,
   "avg_latency_s": 0.0015454545454545454,
   "median_latency_s": 0.002,
   "avg_tokens": 0,
   "avg_prompt_tokens": 0
  },
  "llm": {
   "label": "LLM without vector index",
   "policy_accuracy": 1.0,
   "unsupported_rate": 0.045454545454545456,
   "unsupported_count": 1,
   "abstain_rate": 1.0,
   "avg_latency_s": 1.1212272727272727,
   "median_latency_s": 1.056,
   "avg_tokens": 2973.6363636363635,
   "avg_prompt_tokens": 2936.0454545454545
  },
  "vector": {
   "label": "LLM with vector index",
   "policy_accuracy": 0.9545454545454546,
   "unsupported_rate": 0.045454545454545456,
   "unsupported_count": 1,
   "abstain_rate": 1.0,
   "avg_latency_s": 1.3373636363636363,
   "median_latency_s": 1.2614999999999998,
   "avg_tokens": 329.59090909090907,
   "avg_prompt_tokens": 278.40909090909093
  }
 },
 "questions": [
  {
   "q": "How many days a week can I work from home?",
   "type": "covered",
   "expected": [
    "Remote Work Policy"
   ],
   "results": {
    "rules": {
     "approach": "rules",
     "answer": "Employees may work remotely up to three days per week with manager approval.",
     "policy_title": "Remote Work Policy",
     "latency_s": 0.001,
     "tokens": {
      "prompt": 0,
      "output": 0,
      "thinking": 0,
      "embedding": 0,
      "total": 0
     },
     "retrieved": [
      {
       "title": "Remote Work Policy",
       "score": 5.5
      },
      {
       "title": "Remote Access Policy",
       "score": 4.5
      },
      {
       "title": "Remote Meeting Policy",
       "score": 4.5
      }
     ],
     "policy_correct": true,
     "judge": {
      "supported": true,
      "reason": "The chatbot response accurately reflects the Remote Work Policy stated in the database."
     }
    },
    "llm": {
     "approach": "llm",
     "answer": "Employees may work remotely up to three days per week with manager approval.",
     "policy_title": "Remote Work Policy",
     "latency_s": 2.885,
     "tokens": {
      "prompt": 2935,
      "output": 35,
      "thinking": 0,
      "embedding": 0,
      "total": 2970
     },
     "retrieved": [],
     "policy_correct": true,
     "judge": {
      "supported": true,
      "reason": "The chatbot response accurately reflects the Remote Work Policy stated in the database."
     }
    },
    "vector": {
     "approach": "vector",
     "answer": "Employees may work remotely up to three days per week with manager approval.",
     "policy_title": "Remote Work Policy",
     "latency_s": 2.496,
     "tokens": {
      "prompt": 281,
      "output": 35,
      "thinking": 0,
      "embedding": 11,
      "total": 327
     },
     "retrieved": [
      {
       "title": "Remote Work Policy",
       "score": 0.735
      },
      {
       "title": "Flexible Hours Policy",
       "score": 0.658
      },
      {
       "title": "Work From Abroad Policy",
       "score": 0.655
      }
     ],
     "policy_correct": true,
     "judge": {
      "supported": true,
      "reason": "The chatbot response correctly cites the Remote Work Policy which states employees may work remotely up to three days per week with manager approval."
     }
    }
   }
  },
  {
   "q": "Do I need permission before buying an $800 monitor for work?",
   "type": "covered",
   "expected": [
    "Expense Approval Policy",
    "Procurement Policy"
   ],
   "results": {
    "rules": {
     "approach": "rules",
     "answer": "I couldn't find a company policy that covers this question.",
     "policy_title": null,
     "latency_s": 0.002,
     "tokens": {
      "prompt": 0,
      "output": 0,
      "thinking": 0,
      "embedding": 0,
      "total": 0
     },
     "retrieved": [
      {
       "title": "Promotion Policy",
       "score": 1.0
      },
      {
       "title": "Performance Review Policy",
       "score": 0.0
      },
      {
       "title": "Dress Code Policy",
       "score": 0.0
      }
     ],
     "policy_correct": false,
     "judge": {
      "supported": true,
      "reason": "Declined to answer (no policy found)."
     }
    },
    "llm": {
     "approach": "llm",
     "answer": "All expenses over $500 require prior approval from Finance.",
     "policy_title": "Expense Approval Policy",
     "latency_s": 0.956,
     "tokens": {
      "prompt": 2939,
      "output": 34,
      "thinking": 0,
      "embedding": 0,
      "total": 2973
     },
     "retrieved": [],
     "policy_correct": true,
     "judge": {
      "supported": true,
      "reason": "The chatbot response correctly cites the Expense Approval Policy which requires prior approval for expenses over $500."
     }
    },
    "vector": {
     "approach": "vector",
     "answer": "Yes, all expenses over $500 require prior approval from Finance.",
     "policy_title": "Expense Approval Policy",
     "latency_s": 1.161,
     "tokens": {
      "prompt": 280,
      "output": 36,
      "thinking": 0,
      "embedding": 15,
      "total": 331
     },
     "retrieved": [
      {
       "title": "Expense Approval Policy",
       "score": 0.672
      },
      {
       "title": "Hardware Upgrade Policy",
       "score": 0.658
      },
      {
       "title": "Home Office Equipment Policy",
       "score": 0.657
      }
     ],
     "policy_correct": true,
     "judge": {
      "supported": true,
      "reason": "The chatbot's response is directly supported by the Expense Approval Policy which states that all expenses over $500 require prior approval from Finance."
     }
    }
   }
  },
  {
   "q": "How many vacation days do I get, and can I carry unused ones over?",
   "type": "covered",
   "expected": [
    "Vacation Policy"
   ],
   "results": {
    "rules": {
     "approach": "rules",
     "answer": "Employees receive 15 vacation days per year. Unused days may roll over.",
     "policy_title": "Vacation Policy",
     "latency_s": 0.001,
     "tokens": {
      "prompt": 0,
      "output": 0,
      "thinking": 0,
      "embedding": 0,
      "total": 0
     },
     "retrieved": [
      {
       "title": "Vacation Policy",
       "score": 6.0
      },
      {
       "title": "Work From Abroad Policy",
       "score": 1.0
      },
      {
       "title": "Remote Work Policy",
       "score": 1.0
      }
     ],
     "policy_correct": true,
     "judge": {
      "supported": true,
      "reason": "The chatbot's response accurately reflects the Vacation Policy (P95) which states that employees receive 15 vacation days per year and unused days may roll over."
     }
    },
    "llm": {
     "approach": "llm",
     "answer": "Employees receive 15 vacation days per year, and unused days may roll over.",
     "policy_title": "Vacation Policy",
     "latency_s": 1.308,
     "tokens": {
      "prompt": 2940,
      "output": 38,
      "thinking": 0,
      "embedding": 0,
      "total": 2978
     },
     "retrieved": [],
     "policy_correct": true,
     "judge": {
      "supported": true,
      "reason": "The chatbot's response accurately reflects the Vacation Policy details in the database."
     }
    },
    "vector": {
     "approach": "vector",
     "answer": "Employees receive 15 vacation days per year, and unused days may roll over.",
     "policy_title": "Vacation Policy",
     "latency_s": 1.365,
     "tokens": {
      "prompt": 294,
      "output": 38,
      "thinking": 0,
      "embedding": 17,
      "total": 349
     },
     "retrieved": [
      {
       "title": "Vacation Policy",
       "score": 0.75
      },
      {
       "title": "Parental Leave Policy",
       "score": 0.622
      },
      {
       "title": "Work From Abroad Policy",
       "score": 0.621
      }
     ],
     "policy_correct": true,
     "judge": {
      "supported": true,
      "reason": "The chatbot's response accurately reflects the Vacation Policy which states employees receive 15 vacation days per year and unused days may roll over."
     }
    }
   }
  },
  {
   "q": "My grandmother passed away. How much time off can I take?",
   "type": "covered",
   "expected": [
    "Bereavement Leave Policy"
   ],
   "results": {
    "rules": {
     "approach": "rules",
     "answer": "Employees may take up to 5 days of bereavement leave.",
     "policy_title": "Bereavement Leave Policy",
     "latency_s": 0.002,
     "tokens": {
      "prompt": 0,
      "output": 0,
      "thinking": 0,
      "embedding": 0,
      "total": 0
     },
     "retrieved": [
      {
       "title": "Bereavement Leave Policy",
       "score": 5.0
      },
      {
       "title": "Parental Leave Policy",
       "score": 1.0
      },
      {
       "title": "Background Check Policy",
       "score": 1.0
      }
     ],
     "policy_correct": true,
     "judge": {
      "supported": true,
      "reason": "The response accurately cites the Bereavement Leave Policy which states employees may take up to 5 days of bereavement leave."
     }
    },
    "llm": {
     "approach": "llm",
     "answer": "Employees may take up to 5 days of bereavement leave.",
     "policy_title": "Bereavement Leave Policy",
     "latency_s": 1.143,
     "tokens": {
      "prompt": 2937,
      "output": 34,
      "thinking": 0,
      "embedding": 0,
      "total": 2971
     },
     "retrieved": [],
     "policy_correct": true,
     "judge": {
      "supported": true,
      "reason": "The chatbot correctly cites the bereavement leave policy which states employees may take up to 5 days."
     }
    },
    "vector": {
     "approach": "vector",
     "answer": "Employees may take up to 5 days of bereavement leave.",
     "policy_title": "Bereavement Leave Policy",
     "latency_s": 1.162,
     "tokens": {
      "prompt": 285,
      "output": 34,
      "thinking": 0,
      "embedding": 15,
      "total": 334
     },
     "retrieved": [
      {
       "title": "Bereavement Leave Policy",
       "score": 0.737
      },
      {
       "title": "Sick Leave Policy",
       "score": 0.636
      },
      {
       "title": "Vacation Policy",
       "score": 0.634
      }
     ],
     "policy_correct": true,
     "judge": {
      "supported": true,
      "reason": "The chatbot response correctly cites the Bereavement Leave Policy which states employees may take up to 5 days of bereavement leave."
     }
    }
   }
  },
  {
   "q": "How often do I have to change my password?",
   "type": "covered",
   "expected": [
    "Password Policy"
   ],
   "results": {
    "rules": {
     "approach": "rules",
     "answer": "Passwords must be changed every 90 days and meet complexity requirements.",
     "policy_title": "Password Policy",
     "latency_s": 0.002,
     "tokens": {
      "prompt": 0,
      "output": 0,
      "thinking": 0,
      "embedding": 0,
      "total": 0
     },
     "retrieved": [
      {
       "title": "Password Policy",
       "score": 4.0
      },
      {
       "title": "Performance Review Policy",
       "score": 0.0
      },
      {
       "title": "Dress Code Policy",
       "score": 0.0
      }
     ],
     "policy_correct": true,
     "judge": {
      "supported": true,
      "reason": "The chatbot's response directly matches the Password Policy in the database."
     }
    },
    "llm": {
     "approach": "llm",
     "answer": "Passwords must be changed every 90 days and meet complexity requirements.",
     "policy_title": "Password Policy",
     "latency_s": 1.057,
     "tokens": {
      "prompt": 2934,
      "output": 34,
      "thinking": 0,
      "embedding": 0,
      "total": 2968
     },
     "retrieved": [],
     "policy_correct": true,
     "judge": {
      "supported": true,
      "reason": "The chatbot's response directly matches the Password Policy in the database."
     }
    },
    "vector": {
     "approach": "vector",
     "answer": "Passwords must be changed every 90 days and meet complexity requirements.",
     "policy_title": "Password Policy",
     "latency_s": 1.167,
     "tokens": {
      "prompt": 271,
      "output": 27,
      "thinking": 0,
      "embedding": 11,
      "total": 309
     },
     "retrieved": [
      {
       "title": "Password Policy",
       "score": 0.723
      },
      {
       "title": "Account Management Policy",
       "score": 0.61
      },
      {
       "title": "Cybersecurity Awareness Policy",
       "score": 0.595
      }
     ],
     "policy_correct": true,
     "judge": {
      "supported": true,
      "reason": "The chatbot's response directly matches the Password Policy in the database."
     }
    }
   }
  },
  {
   "q": "I'm having a baby - how long is the paid leave?",
   "type": "covered",
   "expected": [
    "Parental Leave Policy"
   ],
   "results": {
    "rules": {
     "approach": "rules",
     "answer": "Eligible employees may take up to 12 weeks of paid parental leave.",
     "policy_title": "Parental Leave Policy",
     "latency_s": 0.001,
     "tokens": {
      "prompt": 0,
      "output": 0,
      "thinking": 0,
      "embedding": 0,
      "total": 0
     },
     "retrieved": [
      {
       "title": "Parental Leave Policy",
       "score": 9.0
      },
      {
       "title": "Sick Leave Policy",
       "score": 4.0
      },
      {
       "title": "Bereavement Leave Policy",
       "score": 4.0
      }
     ],
     "policy_correct": true,
     "judge": {
      "supported": true,
      "reason": "The chatbot's response accurately reflects the Parental Leave Policy (P75) in the database."
     }
    },
    "llm": {
     "approach": "llm",
     "answer": "Eligible employees may take up to 12 weeks of paid parental leave.",
     "policy_title": "Parental Leave Policy",
     "latency_s": 1.062,
     "tokens": {
      "prompt": 2938,
      "output": 38,
      "thinking": 0,
      "embedding": 0,
      "total": 2976
     },
     "retrieved": [],
     "policy_correct": true,
     "judge": {
      "supported": true,
      "reason": "The chatbot's response accurately reflects the Parental Leave Policy (P75) in the database."
     }
    },
    "vector": {
     "approach": "vector",
     "answer": "Eligible employees may take up to 12 weeks of paid parental leave.",
     "policy_title": "Parental Leave Policy",
     "latency_s": 1.366,
     "tokens": {
      "prompt": 288,
      "output": 38,
      "thinking": 0,
      "embedding": 12,
      "total": 338
     },
     "retrieved": [
      {
       "title": "Parental Leave Policy",
       "score": 0.7
      },
      {
       "title": "Vacation Policy",
       "score": 0.61
      },
      {
       "title": "Sick Leave Policy",
       "score": 0.578
      }
     ],
     "policy_correct": true,
     "judge": {
      "supported": true,
      "reason": "The chatbot's response directly matches the Parental Leave Policy [P75] in the database."
     }
    }
   }
  },
  {
   "q": "Can I spend a few weeks working from Spain?",
   "type": "covered",
   "expected": [
    "Work From Abroad Policy"
   ],
   "results": {
    "rules": {
     "approach": "rules",
     "answer": "I couldn't find a company policy that covers this question.",
     "policy_title": null,
     "latency_s": 0.001,
     "tokens": {
      "prompt": 0,
      "output": 0,
      "thinking": 0,
      "embedding": 0,
      "total": 0
     },
     "retrieved": [
      {
       "title": "Onboarding Policy",
       "score": 1.0
      },
      {
       "title": "Remote Work Policy",
       "score": 1.0
      },
      {
       "title": "Expense Approval Policy",
       "score": 1.0
      }
     ],
     "policy_correct": false,
     "judge": {
      "supported": true,
      "reason": "Declined to answer (no policy found)."
     }
    },
    "llm": {
     "approach": "llm",
     "answer": "Employees may work abroad for up to 30 days with approval.",
     "policy_title": "Work From Abroad Policy",
     "latency_s": 0.902,
     "tokens": {
      "prompt": 2934,
      "output": 36,
      "thinking": 0,
      "embedding": 0,
      "total": 2970
     },
     "retrieved": [],
     "policy_correct": true,
     "judge": {
      "supported": true,
      "reason": "The chatbot correctly cites the Work From Abroad Policy which allows employees to work abroad for up to 30 days with approval."
     }
    },
    "vector": {
     "approach": "vector",
     "answer": "Employees may work abroad for up to 30 days with approval. The policy does not specify whether Spain is an approved location.",
     "policy_title": "Work From Abroad Policy",
     "latency_s": 1.329,
     "tokens": {
      "prompt": 280,
      "output": 48,
      "thinking": 0,
      "embedding": 11,
      "total": 339
     },
     "retrieved": [
      {
       "title": "Work From Abroad Policy",
       "score": 0.721
      },
      {
       "title": "Remote Work Policy",
       "score": 0.642
      },
      {
       "title": "Flexible Hours Policy",
       "score": 0.617
      }
     ],
     "policy_correct": true,
     "judge": {
      "supported": false,
      "reason": "The chatbot claims the policy does not specify whether Spain is an approved location, but the database policy P10 does not restrict or mention specific countries for working abroad."
     }
    }
   }
  },
  {
   "q": "I think my laptop has been hacked. What should I do?",
   "type": "covered",
   "expected": [
    "Security Incident Policy",
    "Incident Response Policy"
   ],
   "results": {
    "rules": {
     "approach": "rules",
     "answer": "Security incidents must be reported immediately.",
     "policy_title": "Security Incident Policy",
     "latency_s": 0.002,
     "tokens": {
      "prompt": 0,
      "output": 0,
      "thinking": 0,
      "embedding": 0,
      "total": 0
     },
     "retrieved": [
      {
       "title": "Security Incident Policy",
       "score": 8.5
      },
      {
       "title": "Incident Response Policy",
       "score": 4.5
      },
      {
       "title": "Laptop Usage Policy",
       "score": 4.5
      }
     ],
     "policy_correct": true,
     "judge": {
      "supported": true,
      "reason": "The chatbot's response directly matches the Security Incident Policy in the database."
     }
    },
    "llm": {
     "approach": "llm",
     "answer": "Security incidents must be reported immediately. The policy does not specify any other steps to take if a laptop is hacked.",
     "policy_title": "Security Incident Policy",
     "latency_s": 1.059,
     "tokens": {
      "prompt": 2937,
      "output": 44,
      "thinking": 0,
      "embedding": 0,
      "total": 2981
     },
     "retrieved": [],
     "policy_correct": true,
     "judge": {
      "supported": true,
      "reason": "The chatbot correctly cites the Security Incident Policy and states that incidents must be reported immediately, without adding unsupported details."
     }
    },
    "vector": {
     "approach": "vector",
     "answer": "Security incidents must be reported immediately. The policy does not specify any further steps for handling a hacked laptop.",
     "policy_title": "Security Incident Policy",
     "latency_s": 1.335,
     "tokens": {
      "prompt": 275,
      "output": 35,
      "thinking": 0,
      "embedding": 13,
      "total": 323
     },
     "retrieved": [
      {
       "title": "Laptop Usage Policy",
       "score": 0.628
      },
      {
       "title": "Security Incident Policy",
       "score": 0.625
      },
      {
       "title": "Software Installation Policy",
       "score": 0.589
      }
     ],
     "policy_correct": true,
     "judge": {
      "supported": true,
      "reason": "The chatbot correctly cites the Security Incident Policy and states that incidents must be reported immediately."
     }
    }
   }
  },
  {
   "q": "How long is the probation period for new employees?",
   "type": "covered",
   "expected": [
    "Probation Period Policy"
   ],
   "results": {
    "rules": {
     "approach": "rules",
     "answer": "New hires are subject to a 90-day probation period.",
     "policy_title": "Probation Period Policy",
     "latency_s": 0.002,
     "tokens": {
      "prompt": 0,
      "output": 0,
      "thinking": 0,
      "embedding": 0,
      "total": 0
     },
     "retrieved": [
      {
       "title": "Probation Period Policy",
       "score": 10.0
      },
      {
       "title": "Onboarding Policy",
       "score": 2.0
      },
      {
       "title": "Background Check Policy",
       "score": 2.0
      }
     ],
     "policy_correct": true,
     "judge": {
      "supported": true,
      "reason": "The chatbot correctly quotes the probation period length specified in the Probation Period Policy."
     }
    },
    "llm": {
     "approach": "llm",
     "answer": "New hires are subject to a 90-day probation period.",
     "policy_title": "Probation Period Policy",
     "latency_s": 0.956,
     "tokens": {
      "prompt": 2934,
      "output": 36,
      "thinking": 0,
      "embedding": 0,
      "total": 2970
     },
     "retrieved": [],
     "policy_correct": true,
     "judge": {
      "supported": true,
      "reason": "The chatbot's response accurately reflects the 90-day probation period stated in policy P43."
     }
    },
    "vector": {
     "approach": "vector",
     "answer": "New hires are subject to a 90-day probation period.",
     "policy_title": "Probation Period Policy",
     "latency_s": 1.264,
     "tokens": {
      "prompt": 274,
      "output": 36,
      "thinking": 0,
      "embedding": 13,
      "total": 323
     },
     "retrieved": [
      {
       "title": "Probation Period Policy",
       "score": 0.744
      },
      {
       "title": "Onboarding Policy",
       "score": 0.639
      },
      {
       "title": "Background Check Policy",
       "score": 0.621
      }
     ],
     "policy_correct": true,
     "judge": {
      "supported": true,
      "reason": "The chatbot correctly answers the question using information directly from policy P43."
     }
    }
   }
  },
  {
   "q": "What is the deadline for handing in receipts after a business trip?",
   "type": "covered",
   "expected": [
    "Travel Reimbursement Policy"
   ],
   "results": {
    "rules": {
     "approach": "rules",
     "answer": "Employees must submit receipts for travel expenses within 30 days.",
     "policy_title": "Travel Reimbursement Policy",
     "latency_s": 0.001,
     "tokens": {
      "prompt": 0,
      "output": 0,
      "thinking": 0,
      "embedding": 0,
      "total": 0
     },
     "retrieved": [
      {
       "title": "Travel Reimbursement Policy",
       "score": 5.0
      },
      {
       "title": "Business Continuity Policy",
       "score": 4.0
      },
      {
       "title": "Dress Code Policy",
       "score": 1.0
      }
     ],
     "policy_correct": true,
     "judge": {
      "supported": true,
      "reason": "The chatbot's response accurately reflects the Travel Reimbursement Policy stating receipts must be submitted within 30 days."
     }
    },
    "llm": {
     "approach": "llm",
     "answer": "Employees must submit receipts for travel expenses within 30 days.",
     "policy_title": "Travel Reimbursement Policy",
     "latency_s": 0.855,
     "tokens": {
      "prompt": 2937,
      "output": 35,
      "thinking": 0,
      "embedding": 0,
      "total": 2972
     },
     "retrieved": [],
     "policy_correct": true,
     "judge": {
      "supported": true,
      "reason": "The response accurately cites the travel reimbursement policy stating receipts must be submitted within 30 days."
     }
    },
    "vector": {
     "approach": "vector",
     "answer": "Employees must submit receipts for travel expenses within 30 days.",
     "policy_title": "Travel Reimbursement Policy",
     "latency_s": 1.175,
     "tokens": {
      "prompt": 285,
      "output": 35,
      "thinking": 0,
      "embedding": 17,
      "total": 337
     },
     "retrieved": [
      {
       "title": "Travel Reimbursement Policy",
       "score": 0.761
      },
      {
       "title": "Petty Cash Policy",
       "score": 0.646
      },
      {
       "title": "Expense Approval Policy",
       "score": 0.622
      }
     ],
     "policy_correct": true,
     "judge": {
      "supported": true,
      "reason": "The chatbot response correctly reflects the policy stated in P93."
     }
    }
   }
  },
  {
   "q": "A client sent me a bottle of wine. Am I allowed to keep it?",
   "type": "covered",
   "expected": [
    "Client Gift Policy"
   ],
   "results": {
    "rules": {
     "approach": "rules",
     "answer": "Client gifts must comply with company guidelines.",
     "policy_title": "Client Gift Policy",
     "latency_s": 0.001,
     "tokens": {
      "prompt": 0,
      "output": 0,
      "thinking": 0,
      "embedding": 0,
      "total": 0
     },
     "retrieved": [
      {
       "title": "Client Gift Policy",
       "score": 4.0
      },
      {
       "title": "Performance Review Policy",
       "score": 0.0
      },
      {
       "title": "Dress Code Policy",
       "score": 0.0
      }
     ],
     "policy_correct": true,
     "judge": {
      "supported": true,
      "reason": "The chatbot correctly cites the Client Gift Policy which states that client gifts must comply with company guidelines."
     }
    },
    "llm": {
     "approach": "llm",
     "answer": "Client gifts must comply with company guidelines. The policy does not specify whether you are allowed to keep a specific gift like a bottle of wine.",
     "policy_title": "Client Gift Policy",
     "latency_s": 1.015,
     "tokens": {
      "prompt": 2940,
      "output": 49,
      "thinking": 0,
      "embedding": 0,
      "total": 2989
     },
     "retrieved": [],
     "policy_correct": true,
     "judge": {
      "supported": true,
      "reason": "The chatbot correctly cites the Client Gift Policy and accurately states that the policy requires gifts to comply with guidelines without specifying particular items like wine."
     }
    },
    "vector": {
     "approach": "vector",
     "answer": "Client gifts must comply with company guidelines, but the policy does not specify whether you are allowed to keep a specific gift like a bottle of wine.",
     "policy_title": "Client Gift Policy",
     "latency_s": 1.261,
     "tokens": {
      "prompt": 272,
      "output": 50,
      "thinking": 0,
      "embedding": 15,
      "total": 337
     },
     "retrieved": [
      {
       "title": "Client Gift Policy",
       "score": 0.711
      },
      {
       "title": "Code of Conduct",
       "score": 0.588
      },
      {
       "title": "Conflict of Interest Policy",
       "score": 0.58
      }
     ],
     "policy_correct": true,
     "judge": {
      "supported": true,
      "reason": "The chatbot correctly cites the Client Gift Policy and notes that it does not specifically mention wine."
     }
    }
   }
  },
  {
   "q": "A journalist called asking about our new product. Can I answer?",
   "type": "covered",
   "expected": [
    "Media Contact Policy",
    "Press Release Policy"
   ],
   "results": {
    "rules": {
     "approach": "rules",
     "answer": "Employees must not disclose confidential information on social media.",
     "policy_title": "Social Media Policy",
     "latency_s": 0.001,
     "tokens": {
      "prompt": 0,
      "output": 0,
      "thinking": 0,
      "embedding": 0,
      "total": 0
     },
     "retrieved": [
      {
       "title": "Social Media Policy",
       "score": 4.0
      },
      {
       "title": "Media Contact Policy",
       "score": 4.0
      },
      {
       "title": "Product Return Policy",
       "score": 3.0
      }
     ],
     "policy_correct": false,
     "judge": {
      "supported": false,
      "reason": "The chatbot cites the social media policy instead of the media contact policy which covers speaking to the media."
     }
    },
    "llm": {
     "approach": "llm",
     "answer": "Only authorized employees may speak to waterfowl or media.",
     "policy_title": "Media Contact Policy",
     "latency_s": 1.263,
     "tokens": {
      "prompt": 2937,
      "output": 31,
      "thinking": 0,
      "embedding": 0,
      "total": 2968
     },
     "retrieved": [],
     "policy_correct": true,
     "judge": {
      "supported": false,
      "reason": "The chatbot's response includes unauthorized information about waterfowl not found in the policy database."
     }
    },
    "vector": {
     "approach": "vector",
     "answer": "Only authorized employees may speak to the media. The policy does not specify whether you are currently authorized to answer this journalist.",
     "policy_title": "Media Contact Policy",
     "latency_s": 1.365,
     "tokens": {
      "prompt": 270,
      "output": 45,
      "thinking": 0,
      "embedding": 16,
      "total": 331
     },
     "retrieved": [
      {
       "title": "Media Contact Policy",
       "score": 0.661
      },
      {
       "title": "Press Release Policy",
       "score": 0.63
      },
      {
       "title": "Public Speaking Policy",
       "score": 0.601
      }
     ],
     "policy_correct": true,
     "judge": {
      "supported": true,
      "reason": "The response correctly cites the Media Contact Policy and acknowledges that authorization is not specified."
     }
    }
   }
  },
  {
   "q": "Is it OK to post about our internal projects on LinkedIn?",
   "type": "covered",
   "expected": [
    "Social Media Policy"
   ],
   "results": {
    "rules": {
     "approach": "rules",
     "answer": "Employees must not disclose confidential information on social media.",
     "policy_title": "Social Media Policy",
     "latency_s": 0.002,
     "tokens": {
      "prompt": 0,
      "output": 0,
      "thinking": 0,
      "embedding": 0,
      "total": 0
     },
     "retrieved": [
      {
       "title": "Social Media Policy",
       "score": 8.0
      },
      {
       "title": "Internal Communication Policy",
       "score": 4.0
      },
      {
       "title": "Media Contact Policy",
       "score": 4.0
      }
     ],
     "policy_correct": true,
     "judge": {
      "supported": true,
      "reason": "The chatbot's response directly reflects the Social Media Policy prohibiting disclosure of confidential information on social media."
     }
    },
    "llm": {
     "approach": "llm",
     "answer": "Employees must not disclose confidential information on social media.",
     "policy_title": "Social Media Policy",
     "latency_s": 0.847,
     "tokens": {
      "prompt": 2936,
      "output": 31,
      "thinking": 0,
      "embedding": 0,
      "total": 2967
     },
     "retrieved": [],
     "policy_correct": true,
     "judge": {
      "supported": true,
      "reason": "The chatbot correctly cited the Social Media Policy which prohibits disclosing confidential information on social media."
     }
    },
    "vector": {
     "approach": "vector",
     "answer": "Employees must not disclose confidential information on social media. The policy does not specify whether posting about internal projects in general is permitted.",
     "policy_title": "Social Media Policy",
     "latency_s": 1.188,
     "tokens": {
      "prompt": 267,
      "output": 39,
      "thinking": 0,
      "embedding": 15,
      "total": 321
     },
     "retrieved": [
      {
       "title": "Social Media Policy",
       "score": 0.682
      },
      {
       "title": "Internal Communication Policy",
       "score": 0.66
      },
      {
       "title": "Public Speaking Policy",
       "score": 0.648
      }
     ],
     "policy_correct": true,
     "judge": {
      "supported": true,
      "reason": "The chatbot accurately quoted the Social Media Policy and noted that the policy does not explicitly mention internal projects."
     }
    }
   }
  },
  {
   "q": "Will the company pay for a certification course I want to take?",
   "type": "covered",
   "expected": [
    "Training Reimbursement Policy",
    "Tuition Assistance Policy"
   ],
   "results": {
    "rules": {
     "approach": "rules",
     "answer": "Employees may be reimbursed for approved external training.",
     "policy_title": "Training Reimbursement Policy",
     "latency_s": 0.002,
     "tokens": {
      "prompt": 0,
      "output": 0,
      "thinking": 0,
      "embedding": 0,
      "total": 0
     },
     "retrieved": [
      {
       "title": "Training Reimbursement Policy",
       "score": 5.0
      },
      {
       "title": "Tuition Assistance Policy",
       "score": 4.0
      },
      {
       "title": "Expense Approval Policy",
       "score": 1.0
      }
     ],
     "policy_correct": true,
     "judge": {
      "supported": true,
      "reason": "The chatbot response directly matches the Training Reimbursement Policy in the database."
     }
    },
    "llm": {
     "approach": "llm",
     "answer": "Employees may apply for tuition assistance for approved programs.",
     "policy_title": "Tuition Assistance Policy",
     "latency_s": 1.06,
     "tokens": {
      "prompt": 2937,
      "output": 32,
      "thinking": 0,
      "embedding": 0,
      "total": 2969
     },
     "retrieved": [],
     "policy_correct": true,
     "judge": {
      "supported": true,
      "reason": "The chatbot response correctly cites the Tuition Assistance Policy which states that employees may apply for tuition assistance for approved programs."
     }
    },
    "vector": {
     "approach": "vector",
     "answer": "Employees may be reimbursed for approved external training, but the policy does not specify whether certification courses are included.",
     "policy_title": "Training Reimbursement Policy",
     "latency_s": 1.758,
     "tokens": {
      "prompt": 276,
      "output": 43,
      "thinking": 0,
      "embedding": 16,
      "total": 335
     },
     "retrieved": [
      {
       "title": "Training Reimbursement Policy",
       "score": 0.683
      },
      {
       "title": "Tuition Assistance Policy",
       "score": 0.676
      },
      {
       "title": "Conference Attendance Policy",
       "score": 0.642
      }
     ],
     "policy_correct": true,
     "judge": {
      "supported": true,
      "reason": "The chatbot correctly cites the training reimbursement policy and notes that the policy does not explicitly specify certification courses."
     }
    }
   }
  },
  {
   "q": "My computer stopped working. Who do I contact?",
   "type": "covered",
   "expected": [
    "Helpdesk Ticket Policy",
    "Support Ticket Policy"
   ],
   "results": {
    "rules": {
     "approach": "rules",
     "answer": "Hardware upgrades must be requested through IT.",
     "policy_title": "Hardware Upgrade Policy",
     "latency_s": 0.002,
     "tokens": {
      "prompt": 0,
      "output": 0,
      "thinking": 0,
      "embedding": 0,
      "total": 0
     },
     "retrieved": [
      {
       "title": "Hardware Upgrade Policy",
       "score": 4.0
      },
      {
       "title": "Laptop Usage Policy",
       "score": 4.0
      },
      {
       "title": "Media Contact Policy",
       "score": 3.0
      }
     ],
     "policy_correct": false,
     "judge": {
      "supported": false,
      "reason": "The chatbot cites a policy about hardware upgrades instead of answering who to contact when a computer stops working."
     }
    },
    "llm": {
     "approach": "llm",
     "answer": "All IT issues must be submitted via helpdesk ticket. The policy does not specify who to contact directly beyond submitting a ticket.",
     "policy_title": "Helpdesk Ticket Policy",
     "latency_s": 0.913,
     "tokens": {
      "prompt": 2934,
      "output": 48,
      "thinking": 0,
      "embedding": 0,
      "total": 2982
     },
     "retrieved": [],
     "policy_correct": true,
     "judge": {
      "supported": true,
      "reason": "The chatbot's response correctly cites the Helpdesk Ticket Policy and does not state any unverified facts."
     }
    },
    "vector": {
     "approach": "vector",
     "answer": "All IT issues must be submitted via helpdesk ticket. The policy does not specify a person or contact method other than submitting a ticket.",
     "policy_title": "Helpdesk Ticket Policy",
     "latency_s": 1.511,
     "tokens": {
      "prompt": 271,
      "output": 49,
      "thinking": 0,
      "embedding": 12,
      "total": 332
     },
     "retrieved": [
      {
       "title": "Helpdesk Ticket Policy",
       "score": 0.636
      },
      {
       "title": "Warranty Policy",
       "score": 0.606
      },
      {
       "title": "Security Incident Policy",
       "score": 0.602
      }
     ],
     "policy_correct": true,
     "judge": {
      "supported": true,
      "reason": "The chatbot correctly cites the Helpdesk Ticket Policy and accurately states that IT issues must be submitted via helpdesk ticket without naming a specific person."
     }
    }
   }
  },
  {
   "q": "How many sick days do I get per year?",
   "type": "partial",
   "expected": [
    "Sick Leave Policy"
   ],
   "note": "Policy says sick leave accrues monthly but gives no number.",
   "results": {
    "rules": {
     "approach": "rules",
     "answer": "Employees accrue sick leave monthly for personal or family illness.",
     "policy_title": "Sick Leave Policy",
     "latency_s": 0.002,
     "tokens": {
      "prompt": 0,
      "output": 0,
      "thinking": 0,
      "embedding": 0,
      "total": 0
     },
     "retrieved": [
      {
       "title": "Sick Leave Policy",
       "score": 4.0
      },
      {
       "title": "Vacation Policy",
       "score": 2.0
      },
      {
       "title": "Warranty Policy",
       "score": 1.0
      }
     ],
     "policy_correct": true,
     "judge": {
      "supported": false,
      "reason": "The chatbot response does not state the exact number of sick days received per year as asked by the employee."
     }
    },
    "llm": {
     "approach": "llm",
     "answer": "Employees accrue sick leave monthly for personal or family illness, but the policy does not specify a total number of sick days per year.",
     "policy_title": "Sick Leave Policy",
     "latency_s": 0.959,
     "tokens": {
      "prompt": 2934,
      "output": 48,
      "thinking": 0,
      "embedding": 0,
      "total": 2982
     },
     "retrieved": [],
     "policy_correct": true,
     "judge": {
      "supported": true,
      "reason": "The chatbot accurately reflects the sick leave policy by stating that sick leave is accrued monthly without specifying a total annual number."
     }
    },
    "vector": {
     "approach": "vector",
     "answer": "Employees accrue sick leave monthly for personal or family illness, but the policy does not specify the exact total number of sick days received per year.",
     "policy_title": "Sick Leave Policy",
     "latency_s": 1.256,
     "tokens": {
      "prompt": 282,
      "output": 49,
      "thinking": 0,
      "embedding": 10,
      "total": 341
     },
     "retrieved": [
      {
       "title": "Sick Leave Policy",
       "score": 0.682
      },
      {
       "title": "Vacation Policy",
       "score": 0.657
      },
      {
       "title": "Bereavement Leave Policy",
       "score": 0.619
      }
     ],
     "policy_correct": true,
     "judge": {
      "supported": true,
      "reason": "The chatbot accurately reflects that sick leave is accrued monthly without stating a specific annual total, which aligns with the database text."
     }
    }
   }
  },
  {
   "q": "Can I roll over more than 5 unused vacation days into next year?",
   "type": "partial",
   "expected": [
    "Vacation Policy"
   ],
   "note": "Policy allows roll-over but states no cap.",
   "results": {
    "rules": {
     "approach": "rules",
     "answer": "Employees receive 15 vacation days per year. Unused days may roll over.",
     "policy_title": "Vacation Policy",
     "latency_s": 0.002,
     "tokens": {
      "prompt": 0,
      "output": 0,
      "thinking": 0,
      "embedding": 0,
      "total": 0
     },
     "retrieved": [
      {
       "title": "Vacation Policy",
       "score": 8.0
      },
      {
       "title": "Warranty Policy",
       "score": 1.0
      },
      {
       "title": "Work From Abroad Policy",
       "score": 1.0
      }
     ],
     "policy_correct": true,
     "judge": {
      "supported": false,
      "reason": "The chatbot response does not answer whether more than 5 unused vacation days can be rolled over."
     }
    },
    "llm": {
     "approach": "llm",
     "answer": "Employees receive 15 vacation days per year and unused days may roll over. The policy does not specify a limit on how many unused vacation days can be rolled over.",
     "policy_title": "Vacation Policy",
     "latency_s": 1.026,
     "tokens": {
      "prompt": 2939,
      "output": 55,
      "thinking": 0,
      "embedding": 0,
      "total": 2994
     },
     "retrieved": [],
     "policy_correct": true,
     "judge": {
      "supported": true,
      "reason": "The chatbot accurately reflects the vacation policy which states that unused days may roll over without specifying a limit."
     }
    },
    "vector": {
     "approach": "vector",
     "answer": "The policy states that unused vacation days may roll over, but it does not specify whether you can roll over more than 5 days.",
     "policy_title": "Vacation Policy",
     "latency_s": 1.263,
     "tokens": {
      "prompt": 291,
      "output": 48,
      "thinking": 0,
      "embedding": 16,
      "total": 355
     },
     "retrieved": [
      {
       "title": "Vacation Policy",
       "score": 0.694
      },
      {
       "title": "Work From Abroad Policy",
       "score": 0.594
      },
      {
       "title": "Bereavement Leave Policy",
       "score": 0.589
      }
     ],
     "policy_correct": true,
     "judge": {
      "supported": true,
      "reason": "The chatbot correctly states that the vacation policy allows roll over but does not specify a limit on the number of days."
     }
    }
   }
  },
  {
   "q": "Are jeans allowed on Fridays?",
   "type": "partial",
   "expected": [
    "Dress Code Policy"
   ],
   "note": "Policy says business casual; no Friday rule.",
   "results": {
    "rules": {
     "approach": "rules",
     "answer": "I couldn't find a company policy that covers this question.",
     "policy_title": null,
     "latency_s": 0.001,
     "tokens": {
      "prompt": 0,
      "output": 0,
      "thinking": 0,
      "embedding": 0,
      "total": 0
     },
     "retrieved": [
      {
       "title": "Performance Review Policy",
       "score": 0.0
      },
      {
       "title": "Dress Code Policy",
       "score": 0.0
      },
      {
       "title": "Warranty Policy",
       "score": 0.0
      }
     ],
     "policy_correct": false,
     "judge": {
      "supported": true,
      "reason": "Declined to answer (no policy found)."
     }
    },
    "llm": {
     "approach": "llm",
     "answer": "The company dress code policy states that employees are expected to dress in business casual attire. It does not specify whether jeans are allowed on Fridays.",
     "policy_title": "Dress Code Policy",
     "latency_s": 1.113,
     "tokens": {
      "prompt": 2930,
      "output": 49,
      "thinking": 0,
      "embedding": 0,
      "total": 2979
     },
     "retrieved": [],
     "policy_correct": true,
     "judge": {
      "supported": true,
      "reason": "The chatbot correctly cites the dress code policy and accurately states that the database does not mention jeans on Fridays."
     }
    },
    "vector": {
     "approach": "vector",
     "answer": "I couldn't find a company policy that covers this question.",
     "policy_title": null,
     "latency_s": 1.163,
     "tokens": {
      "prompt": 269,
      "output": 30,
      "thinking": 0,
      "embedding": 8,
      "total": 307
     },
     "retrieved": [
      {
       "title": "Dress Code Policy",
       "score": 0.67
      },
      {
       "title": "Remote Work Policy",
       "score": 0.614
      },
      {
       "title": "Code of Conduct",
       "score": 0.602
      }
     ],
     "policy_correct": false,
     "judge": {
      "supported": true,
      "reason": "Declined to answer (no policy found)."
     }
    }
   }
  },
  {
   "q": "What is the daily meal allowance when I travel for work?",
   "type": "not_covered",
   "expected": [],
   "note": "No allowance amount exists in the database.",
   "results": {
    "rules": {
     "approach": "rules",
     "answer": "Employees must submit receipts for travel expenses within 30 days.",
     "policy_title": "Travel Reimbursement Policy",
     "latency_s": 0.002,
     "tokens": {
      "prompt": 0,
      "output": 0,
      "thinking": 0,
      "embedding": 0,
      "total": 0
     },
     "retrieved": [
      {
       "title": "Travel Reimbursement Policy",
       "score": 4.0
      },
      {
       "title": "Performance Review Policy",
       "score": 0.0
      },
      {
       "title": "Dress Code Policy",
       "score": 0.0
      }
     ],
     "policy_correct": false,
     "judge": {
      "supported": false,
      "reason": "The chatbot cites the travel reimbursement policy regarding receipts, but the database does not specify a daily meal allowance."
     }
    },
    "llm": {
     "approach": "llm",
     "answer": "I couldn't find a company policy that covers this question.",
     "policy_title": null,
     "latency_s": 0.908,
     "tokens": {
      "prompt": 2936,
      "output": 30,
      "thinking": 0,
      "embedding": 0,
      "total": 2966
     },
     "retrieved": [],
     "policy_correct": true,
     "judge": {
      "supported": true,
      "reason": "Declined to answer (no policy found)."
     }
    },
    "vector": {
     "approach": "vector",
     "answer": "I couldn't find a company policy that covers this question.",
     "policy_title": null,
     "latency_s": 1.213,
     "tokens": {
      "prompt": 285,
      "output": 30,
      "thinking": 0,
      "embedding": 14,
      "total": 329
     },
     "retrieved": [
      {
       "title": "Travel Reimbursement Policy",
       "score": 0.629
      },
      {
       "title": "Work From Abroad Policy",
       "score": 0.599
      },
      {
       "title": "Training Reimbursement Policy",
       "score": 0.596
      }
     ],
     "policy_correct": true,
     "judge": {
      "supported": true,
      "reason": "Declined to answer (no policy found)."
     }
    }
   }
  },
  {
   "q": "What does the company dental insurance cover?",
   "type": "not_covered",
   "expected": [],
   "results": {
    "rules": {
     "approach": "rules",
     "answer": "I couldn't find a company policy that covers this question.",
     "policy_title": null,
     "latency_s": 0.001,
     "tokens": {
      "prompt": 0,
      "output": 0,
      "thinking": 0,
      "embedding": 0,
      "total": 0
     },
     "retrieved": [
      {
       "title": "Warranty Policy",
       "score": 1.0
      },
      {
       "title": "Performance Review Policy",
       "score": 0.0
      },
      {
       "title": "Dress Code Policy",
       "score": 0.0
      }
     ],
     "policy_correct": true,
     "judge": {
      "supported": true,
      "reason": "Declined to answer (no policy found)."
     }
    },
    "llm": {
     "approach": "llm",
     "answer": "I couldn't find a company policy that covers this question.",
     "policy_title": null,
     "latency_s": 1.055,
     "tokens": {
      "prompt": 2932,
      "output": 30,
      "thinking": 0,
      "embedding": 0,
      "total": 2962
     },
     "retrieved": [],
     "policy_correct": true,
     "judge": {
      "supported": true,
      "reason": "Declined to answer (no policy found)."
     }
    },
    "vector": {
     "approach": "vector",
     "answer": "I couldn't find a company policy that covers this question.",
     "policy_title": null,
     "latency_s": 1.207,
     "tokens": {
      "prompt": 273,
      "output": 30,
      "thinking": 0,
      "embedding": 12,
      "total": 315
     },
     "retrieved": [
      {
       "title": "Warranty Policy",
       "score": 0.572
      },
      {
       "title": "Vacation Policy",
       "score": 0.561
      },
      {
       "title": "Diversity and Inclusion Policy",
       "score": 0.558
      }
     ],
     "policy_correct": true,
     "judge": {
      "supported": true,
      "reason": "Declined to answer (no policy found)."
     }
    }
   }
  },
  {
   "q": "Can I bring my dog to the office?",
   "type": "not_covered",
   "expected": [],
   "results": {
    "rules": {
     "approach": "rules",
     "answer": "Access badges must be worn and not shared.",
     "policy_title": "Office Access Policy",
     "latency_s": 0.001,
     "tokens": {
      "prompt": 0,
      "output": 0,
      "thinking": 0,
      "embedding": 0,
      "total": 0
     },
     "retrieved": [
      {
       "title": "Office Access Policy",
       "score": 3.0
      },
      {
       "title": "Home Office Equipment Policy",
       "score": 3.0
      },
      {
       "title": "Performance Review Policy",
       "score": 0.0
      }
     ],
     "policy_correct": false,
     "judge": {
      "supported": false,
      "reason": "The chatbot's response does not address the question about bringing a dog to the office."
     }
    },
    "llm": {
     "approach": "llm",
     "answer": "I couldn't find a company policy that covers this question.",
     "policy_title": null,
     "latency_s": 1.265,
     "tokens": {
      "prompt": 2933,
      "output": 30,
      "thinking": 0,
      "embedding": 0,
      "total": 2963
     },
     "retrieved": [],
     "policy_correct": true,
     "judge": {
      "supported": true,
      "reason": "Declined to answer (no policy found)."
     }
    },
    "vector": {
     "approach": "vector",
     "answer": "I couldn't find a company policy that covers this question.",
     "policy_title": null,
     "latency_s": 1.262,
     "tokens": {
      "prompt": 271,
      "output": 30,
      "thinking": 0,
      "embedding": 9,
      "total": 310
     },
     "retrieved": [
      {
       "title": "Remote Work Policy",
       "score": 0.647
      },
      {
       "title": "Workplace Accommodation Policy",
       "score": 0.636
      },
      {
       "title": "Office Access Policy",
       "score": 0.628
      }
     ],
     "policy_correct": true,
     "judge": {
      "supported": true,
      "reason": "Declined to answer (no policy found)."
     }
    }
   }
  },
  {
   "q": "What is the company's 401(k) matching percentage?",
   "type": "not_covered",
   "expected": [],
   "results": {
    "rules": {
     "approach": "rules",
     "answer": "I couldn't find a company policy that covers this question.",
     "policy_title": null,
     "latency_s": 0.002,
     "tokens": {
      "prompt": 0,
      "output": 0,
      "thinking": 0,
      "embedding": 0,
      "total": 0
     },
     "retrieved": [
      {
       "title": "Performance Review Policy",
       "score": 0.0
      },
      {
       "title": "Dress Code Policy",
       "score": 0.0
      },
      {
       "title": "Warranty Policy",
       "score": 0.0
      }
     ],
     "policy_correct": true,
     "judge": {
      "supported": true,
      "reason": "Declined to answer (no policy found)."
     }
    },
    "llm": {
     "approach": "llm",
     "answer": "I couldn't find a company policy that covers this question.",
     "policy_title": null,
     "latency_s": 1.06,
     "tokens": {
      "prompt": 2940,
      "output": 30,
      "thinking": 0,
      "embedding": 0,
      "total": 2970
     },
     "retrieved": [],
     "policy_correct": true,
     "judge": {
      "supported": true,
      "reason": "Declined to answer (no policy found)."
     }
    },
    "vector": {
     "approach": "vector",
     "answer": "I couldn't find a company policy that covers this question.",
     "policy_title": null,
     "latency_s": 1.155,
     "tokens": {
      "prompt": 285,
      "output": 30,
      "thinking": 0,
      "embedding": 13,
      "total": 328
     },
     "retrieved": [
      {
       "title": "Vacation Policy",
       "score": 0.569
      },
      {
       "title": "Performance Review Policy",
       "score": 0.556
      },
      {
       "title": "Remote Work Policy",
       "score": 0.55
      }
     ],
     "policy_correct": true,
     "judge": {
      "supported": true,
      "reason": "Declined to answer (no policy found)."
     }
    }
   }
  }
 ]
};
